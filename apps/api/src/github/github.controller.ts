import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { RoleGuard } from '../auth/guards/role.guard'
import { Public } from '../auth/decorators/public.decorator'
import { JwtPayload } from '../auth/auth.service'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { GithubService } from './github.service'
import {
  createBranchInput,
  createReleaseInput,
  createPullRequestInput,
  createIssueInput,
} from './github.type'

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('Github')
@Controller('github')
export class GithubController {

  constructor(private readonly githubService: GithubService) {}

  @Public()
  @Post('webhook')
  async webhook(@Body() body) {
    return await this.githubService.handleWebhook(body)
  }

  @Post('create-webhook')
  async createWebhook(
    @CurrentUser() user: JwtPayload,
    @Body('name') name: string,
    @Body('where') where: string,
  ) {
    return await this.githubService.createWebhook(user.id, name, where)
  }

  @Post('data')
  async getData(
    @CurrentUser() user: JwtPayload,
    @Body('variables') variables: string,
  ) {
    return await this.githubService.getData(user.id, variables)
  }

  @Post('add-credentials')
  async createCredential(
    @CurrentUser() user: JwtPayload,
    @Body('accessToken') accessToken: string,
  ) {
    return await this.githubService.createCredentials(user.id, accessToken)
  }
  @Post('create-issue')
  async createIssue(
    @CurrentUser() user: JwtPayload,
    @Body() createIssueInput: createIssueInput,
  ) {
    return await this.githubService.createIssue(user.id, createIssueInput)
  }

  @Post('create-release')
  async createRelease(
    @CurrentUser() user: JwtPayload,
    @Body() createReleaseInput: createReleaseInput,
  ) {
    return await this.githubService.createRelease(user.id, createReleaseInput)
  }
  @Post('create-branch')
  async createBranch(
    @CurrentUser() user: JwtPayload,
    @Body() createBranchInput: createBranchInput,
  ) {
    return await this.githubService.createBranch(user.id, createBranchInput)
  }

  @Post('create-pull-request')
  async createPullRequest(
    @CurrentUser() user: JwtPayload,
    @Body() createPullRequestInput: createPullRequestInput,
  ) {
    return await this.githubService.createPullRequest(
      user.id,
      createPullRequestInput,
    )
  }

}
