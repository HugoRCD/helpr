import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LinearClient } from '@linear/sdk'
import { ProviderCredentials } from '@prisma/client'
import { Scope } from 'eslint'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { ProviderService } from '../provider/provider.service'
import { FlowService } from '../flow/flow.service'
import { NgrokService } from '../ngrok'
import { Status, Trigger } from '../flow/flow.type'
import { createIssueInput, createProjectInput } from './linear.type'
import Variable = Scope.Variable;

@Injectable()
export class LinearService {

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private providerService: ProviderService,
    private flowService: FlowService,
    private readonly ngrokService: NgrokService,
  ) {}

  async handleWebhook(body: any) {
    if (body.action === 'create' && body.type === 'Issue') {
      const user = await this.userService.getUserByProviderId(
        body.data.subscriberIds[0],
      )
      const { data: flows } = await this.flowService.getFlowsToTrigger(
        Trigger.TICKET_CREATED,
        user.id,
      )
      const last_linear_ticket_title = body.data.title
      const last_linear_ticket_description = body.data.description
      const last_linear_team_id = body.data.teamId
      const last_linear_ticket_number = body.data.number.toString()
      const variables = [
        {
          key: 'last_linear_ticket_title',
          value: last_linear_ticket_title,
        },
        {
          key: 'last_linear_ticket_description',
          value: last_linear_ticket_description,
        },
        {
          key: 'last_linear_team_id',
          value: last_linear_team_id,
        },
        {
          key: 'last_linear_ticket_number',
          value: last_linear_ticket_number,
        },
      ]
      for (const flow of flows) {
        await this.flowService.updateFlowStatus(flow.id, Status.READY)
        await this.flowService.addFlowData(flow.id, variables)
      }
    }
  }

  checkIfWebhookExists(webhook, teamId: string, url: string) {
    return webhook.nodes.find((w) => {
      return w._team.id === teamId && w.url === url
    })
  }

  async createWebhook(userId: number, name: string, where: string) {
    if (!where) throw new BadRequestException('team_id_required')
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      'linear',
      true,
    )
    const linearClient = new LinearClient({
      apiKey: accessToken,
    })
    const env = this.configService.get('env')
    const webhookProdUrl =
      this.configService.get('api_url') + '/linear/webhook'
    const ngrokUrl = this.ngrokService.url + '/linear/webhook'
    const finalUrl = env === 'production' ? webhookProdUrl : ngrokUrl
    const webhooks = await linearClient.webhooks()
    const webhookExist = await this.checkIfWebhookExists(
      webhooks,
      where,
      finalUrl,
    )
    if (webhookExist) {
      return {
        message: 'webhook_already_exists',
      }
    }
    await linearClient.createWebhook({
      url: finalUrl,
      resourceTypes: ['Issue', 'Project'],
      teamId: where,
      label: name,
    })
    return {
      message: 'webhook_created',
    }
  }

  async createCredentials(
    userId: number,
    accessToken: string,
  ): Promise<ProviderCredentials> {
    const user = await this.userService.getUserById(userId)
    if (!user) throw new BadRequestException('user_not_found')
    const linearClient = new LinearClient({
      apiKey: accessToken,
    })
    const linearUser = await linearClient.viewer
    if (!linearUser) throw new BadRequestException('invalid_credentials')
    return this.providerService.addCredentials(
      user.id,
      linearUser.id,
      'linear',
      accessToken,
    )
  }

  async createIssue(userId: number, createIssueInput: createIssueInput) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      'linear',
      true,
    )
    const linearClient = new LinearClient({
      apiKey: accessToken,
    })
    const linearUser = await linearClient.viewer
    if (!linearUser) throw new BadRequestException('invalid_credentials')
    const team = await linearClient.team(createIssueInput.linear_team_id)
    if (!team) throw new BadRequestException('team_not_found')
    console.log(createIssueInput)
    const labels = []
    if (createIssueInput.linear_ticket_label_id) {
      labels.push(createIssueInput.linear_ticket_label_id)
    }
    let cycleId = null
    if (createIssueInput.linear_cycle_id) {
      cycleId = createIssueInput.linear_cycle_id
    }
    await linearClient.createIssue({
      title: createIssueInput.linear_ticket_title,
      teamId: createIssueInput.linear_team_id,
      description: createIssueInput.linear_ticket_description || '',
      assigneeId: createIssueInput.linear_assignee_id || linearUser.id,
      labelIds: labels,
      cycleId,
    })
    return {
      message: 'issue_created',
      variables: {
        last_linear_ticket_title: createIssueInput.linear_ticket_title,
        last_linear_ticket_description:
          createIssueInput.linear_ticket_description,
      },
    }
  }

  async createProject(userId: number, createProjectInput: createProjectInput) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      'linear',
      true,
    )
    const linearClient = new LinearClient({
      apiKey: accessToken,
    })
    const linearUser = await linearClient.viewer
    if (!linearUser) throw new BadRequestException('invalid_credentials')
    const team = await linearClient.team(createProjectInput.linear_team_id)
    if (!team) throw new BadRequestException('team_not_found')
    await linearClient.createProject({
      name: createProjectInput.linear_project_title,
      teamIds: [createProjectInput.linear_team_id],
      description: createProjectInput.linear_project_description || '',
    })
    return {
      message: 'project_created',
      variables: {
        last_linear_project_title: createProjectInput.linear_project_title,
        last_linear_project_description:
          createProjectInput.linear_project_description,
      },
    }
  }

  async getData(userId: number, variables: any) {
    let teamId = ''
    if (variables && variables.linear_team_id) {
      teamId = variables.linear_team_id
    }
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      'linear',
      true,
    )
    const linearClient = new LinearClient({
      apiKey: accessToken,
    })
    const linearUser = await linearClient.viewer
    if (!linearUser) throw new BadRequestException('invalid_credentials')
    const teams = await linearUser.teams()
    const users = await linearClient.users()
    const labels = await linearClient.issueLabels()
    let cycles = []
    let states = []
    if (teamId) {
      const foundStates = await linearClient.workflowStates({
        filter: {
          team: {
            id: {
              eq: teamId,
            },
          },
        },
      })
      const foundCycles = await linearClient.cycles({
        filter: {
          team: {
            id: {
              eq: teamId,
            },
          },
        },
      })
      states = foundStates.nodes
      cycles = foundCycles.nodes
    }
    return {
      linear_team_id: teams.nodes.map((team) => {
        return { name: team.name, value: team.id }
      }),
      linear_assignee_id: users.nodes.map((user) => {
        return { name: user.name, value: user.id }
      }),
      linear_ticket_label_id: labels.nodes.map((label) => {
        return { name: label.name, value: label.id }
      }),
      linear_ticket_state_id: states.map((state) => {
        return { name: state.name, value: state.id }
      }),
      linear_cycle_id: cycles.map((cycle) => {
        return { name: cycle.name, value: cycle.id }
      }),
    }
  }

}
