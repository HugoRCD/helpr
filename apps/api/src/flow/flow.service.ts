import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { AuthService } from '../auth/auth.service'
import { createFlowInput, Status, Trigger } from './flow.type'

@Injectable()
export class FlowService {

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async addFlow(userId: number, flowData: createFlowInput) {
    const user = await this.userService.getUserById(userId)
    if (!user) throw new BadRequestException('user_not_found')
    const actions = await this.prisma.action.findMany({
      where: {
        id: {
          in: flowData.actions.map((action) => action.id),
        },
      },
    })
    if (actions.length !== flowData.actions.length) {
      throw new BadRequestException('actions_not_found')
    }
    const trigger = await this.prisma.trigger.findUnique({
      where: {
        id: flowData.triggerId,
      },
    })
    if (!trigger) throw new BadRequestException('trigger_not_found')
    const accessToken = await this.authService.createAccessToken(user, true)
    const isFlowExist = await this.prisma.flow.findFirst({
      where: {
        name: flowData.name,
        userId: userId,
      },
    })
    if (isFlowExist) throw new BadRequestException('Flow already exist')
    const flow = await this.prisma.flow.create({
      data: {
        name: flowData.name,
        description: flowData.description,
        userId: userId,
        triggerId: trigger.id,
        status: Status.STANDBY,
        public: flowData.public,
        accessToken: accessToken,
        enabled: flowData.enabled,
      },
    })
    await this.prisma.flowActions.createMany({
      data: flowData.actions.map((action) => {
        return {
          actionId: action.id,
          flowId: flow.id,
          index: action.index,
          payload: JSON.stringify(action.payload),
        }
      }),
    })
    return {
      message: 'flow_created',
      data: flow,
    }
  }

  async getUserFlows(userId: number, publicOnly = false) {
    const user = await this.userService.getUserById(userId)
    if (!user) throw new BadRequestException('user_not_found')
    const flows = await this.prisma.flow.findMany({
      where: {
        userId: userId,
        public: publicOnly ? true : undefined,
      },
      include: {
        trigger: {
          include: {
            Provider: true,
          },
        },
        actions: {
          include: {
            action: {
              include: {
                provider: true,
                variables: true,
              },
            },
          },
        },
      },
    })
    const providers = flows.map((flow) => {
      const trigger = flow.trigger.Provider
      const actions = flow.actions.map((action) => action.action.provider)
      return [trigger, ...actions]
    })
    const flowsData = flows.map((flow) => {
      return {
        id: flow.id,
        name: flow.name,
        description: flow.description,
        status: flow.status,
        enabled: flow.enabled,
        public: flow.public,
        trigger: flow.trigger,
        providers: providers[flows.indexOf(flow)],
        actions: flow.actions.map((action) => {
          return {
            id: action.id,
            index: action.index,
            action: action.action,
            payload: JSON.parse(action.payload),
          }
        }),
      }
    })
    return {
      message: 'flows_found',
      data: flowsData,
    }
  }

  async getFlowById(flowId: number) {
    const flow = await this.prisma.flow.findUnique({
      where: {
        id: flowId,
      },
      include: {
        trigger: {
          include: {
            Provider: true,
          },
        },
        actions: {
          include: {
            action: {
              include: {
                provider: true,
                variables: true,
              },
            },
          },
        },
      },
    })
    if (!flow) throw new BadRequestException('flow_not_found')
    const providers = flow.actions.map((action) => action.action.provider)
    const flowData = {
      id: flow.id,
      name: flow.name,
      description: flow.description,
      status: flow.status,
      enabled: flow.enabled,
      public: flow.public,
      trigger: flow.trigger,
      providers: providers,
      actions: flow.actions.map((action) => {
        return {
          id: action.id,
          index: action.index,
          action: action.action,
          payload: JSON.parse(action.payload),
        }
      }),
    }
    return {
      message: 'flow_found',
      data: flowData,
    }
  }

  async getFlowsToRun(trigger: Trigger) {
    const flows = await this.prisma.flow.findMany({
      where: {
        status: Status.READY,
        enabled: true,
        trigger: {
          value: trigger,
        },
      },
      include: {
        trigger: {
          select: {
            value: true,
          },
        },
        actions: {
          include: {
            action: {
              include: {
                variables: {
                  select: {
                    key: true,
                    value: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return {
      message: 'flows_found',
      data: flows,
    }
  }

  async getFlowsToTrigger(trigger: Trigger, userId: number) {
    const flows = await this.prisma.flow.findMany({
      where: {
        status: Status.STANDBY,
        enabled: true,
        trigger: {
          value: trigger,
        },
        userId: userId,
      },
      include: {
        trigger: {
          select: {
            value: true,
          },
        },
        actions: {
          include: {
            action: {
              include: {
                variables: {
                  select: {
                    key: true,
                    value: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return {
      message: 'flows_found',
      data: flows,
    }
  }

  async getFlowsToTriggerCron(trigger: Trigger) {
    const flows = await this.prisma.flow.findMany({
      where: {
        status: Status.STANDBY,
        enabled: true,
        trigger: {
          value: trigger,
        },
      },
      include: {
        trigger: {
          select: {
            value: true,
          },
        },
        actions: {
          include: {
            action: {
              include: {
                variables: {
                  select: {
                    key: true,
                    value: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return {
      message: 'flows_found',
      data: flows,
    }
  }

  async getTriggerFlows() {
    const flows = await this.prisma.flow.findMany({
      where: {
        status: Status.READY,
        enabled: true,
        AND: {
          trigger: {
            value: {
              notIn: [
                Trigger.EVERY_DAY,
                Trigger.EVERY_1_HOUR,
                Trigger.EVERY_10_MINUTES,
              ],
            },
          },
        },
      },
      include: {
        trigger: {
          select: {
            value: true,
          },
        },
        actions: {
          include: {
            action: {
              include: {
                variables: {
                  select: {
                    key: true,
                    value: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return {
      message: 'flows_found',
      data: flows,
    }
  }

  async updateFlowStatus(flowId: number, status: Status) {
    return await this.prisma.flow.update({
      where: {
        id: flowId,
      },
      data: {
        status: status,
      },
    })
  }

  async updateFlowEnabled(userId: number, flowId: number, enabled: boolean) {
    const flow = await this.prisma.flow.findFirst({
      where: {
        id: flowId,
        userId: userId,
      },
    })
    if (!flow) throw new BadRequestException('flow_not_found')
    return await this.prisma.flow.update({
      where: {
        id: flowId,
      },
      data: {
        enabled: enabled,
      },
    })
  }

  async updateFlowPublic(userId: number, flowId: number, publicFlow: boolean) {
    const flow = await this.prisma.flow.findFirst({
      where: {
        id: flowId,
        userId: userId,
      },
    })
    if (!flow) throw new BadRequestException('flow_not_found')
    return await this.prisma.flow.update({
      where: {
        id: flowId,
      },
      data: {
        public: publicFlow,
      },
    })
  }

  async deleteFlow(userId: number, flowId: number) {
    const flow = await this.prisma.flow.findFirst({
      where: {
        id: flowId,
        userId: userId,
      },
    })
    if (!flow) throw new BadRequestException('flow_not_found')
    await this.prisma.flowActions.deleteMany({
      where: {
        flowId: flowId,
      },
    })
    await this.prisma.flow.delete({
      where: {
        id: flowId,
      },
    })
    return {
      message: 'flow_deleted',
    }
  }

  async addFlowData(
    flowId: number,
    variables: { key: string; value: string }[],
  ) {
    const data = variables.map((variable) => {
      return {
        key: variable.key,
        value: variable.value,
        flowId: flowId,
      }
    })
    for (const variable of data) {
      const flowVariable = await this.prisma.flowVariables.findFirst({
        where: {
          key: variable.key,
          flowId: variable.flowId,
        },
      })
      if (flowVariable) {
        await this.prisma.flowVariables.upsert({
          where: {
            id: flowVariable.id,
          },
          update: {
            value: variable.value,
          },
          create: {
            key: variable.key,
            value: variable.value,
          },
        })
      } else {
        await this.prisma.flowVariables.create({
          data: {
            key: variable.key,
            value: variable.value,
            flowId: variable.flowId,
          },
        })
      }
    }
  }

  async getFlowData(flowId: number) {
    const flowVariables = await this.prisma.flowVariables.findMany({
      where: {
        flowId: flowId,
      },
    })
    return {
      message: 'flow_data_found',
      data: flowVariables,
    }
  }

}
