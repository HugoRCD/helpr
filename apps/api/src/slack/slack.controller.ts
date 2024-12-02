import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SlackService } from "./slack.service";
import { postMessageInput, createChannelInput } from "./slack.type";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags("Slack")
@Controller("slack")
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Post("post-message")
  async postMessage(@Body() postMessage: postMessageInput) {
    return await this.slackService.postMessage(postMessage);
  }

  @Post("create-channel")
  async createChannel(@Body() createChannelInput: createChannelInput) {
    return await this.slackService.createChannel(createChannelInput);
  }
}
