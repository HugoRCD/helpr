import { Controller, Post, Body, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WebClient } from '@slack/web-api'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { ProviderService } from '../provider/provider.service'
import { postMessageInput, createChannelInput } from './slack.type'

@Injectable()
export class SlackService {

  private readonly slackClient: WebClient
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private providerService: ProviderService,
  ) {
    const bot_token = configService.get('slack.bot_access_token')
    this.slackClient = new WebClient(bot_token)
  }

  async postMessage(postMessage: postMessageInput) {
    await this.slackClient.chat.postMessage({
      channel: postMessage.slack_message_channel,
      text: postMessage.slack_message_text,
    })
  }

  async createChannel(createChannelInput: createChannelInput) {
    const result = await this.slackClient.conversations.create({
      name: createChannelInput.slack_channel_name,
      is_private: createChannelInput.slack_channel_privacy,
    })
    return result.channel.id
  }

}
