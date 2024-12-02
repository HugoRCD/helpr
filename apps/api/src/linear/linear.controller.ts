import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { Public } from "../auth/decorators/public.decorator";
import { LinearService } from "./linear.service";
import { JwtPayload } from "../auth/auth.service";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { createIssueInput, createProjectInput } from "./linear.type";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags("Linear")
@Controller("linear")
export class LinearController {
  constructor(private readonly linearService: LinearService) {}

  @Public()
  @Post("webhook")
  async webhook(@Body() body) {
    return await this.linearService.handleWebhook(body);
  }

  @Post("data")
  async getData(
    @CurrentUser() user: JwtPayload,
    @Body("variables") variables: string,
  ) {
    return await this.linearService.getData(user.id, variables);
  }

  @Post("create-webhook")
  async createWebhook(
    @CurrentUser() user: JwtPayload,
    @Body("name") name: string,
    @Body("where") where: string,
  ) {
    return await this.linearService.createWebhook(user.id, name, where);
  }

  @Post("add-credentials")
  async createCredential(
    @CurrentUser() user: JwtPayload,
    @Body("accessToken") accessToken: string,
  ) {
    return await this.linearService.createCredentials(user.id, accessToken);
  }

  @Post("create-ticket")
  async createIssue(
    @CurrentUser() user: JwtPayload,
    @Body() issue: createIssueInput,
  ) {
    return await this.linearService.createIssue(user.id, issue);
  }

  @Post("create-project")
  async createProject(
    @CurrentUser() user: JwtPayload,
    @Body() project: createProjectInput,
  ) {
    return await this.linearService.createProject(user.id, project);
  }
}
