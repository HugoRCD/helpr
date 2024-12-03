import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { google } from 'googleapis'
import { PrismaService } from '../../prisma.service'
import { UserService } from '../../user/user.service'
import { ProviderService } from '../../provider/provider.service'
import { createDraftInput, createMailInput } from './gmail.type'

@Injectable()
export class GmailService {

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private providerService: ProviderService,
  ) {}

  /*  async handleWebhook(body: any) {
    console.log(body);
    if (body.data) {
      const { title, number, labels, team } = body.data;
      const prefix = (
        labels && labels[0].name ? labels[0].name : "feature"
      ).toLowerCase();
      const teamName = (team && team.name ? team.name : title).toLowerCase();
      const branchName = `${prefix}/${teamName}-${number}`;
      console.log(branchName);
    }
  }

  async createWebhook(userId: number, teamId: string) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      "sheet",
      true,
    );
    const sheetClient = new LinearClient({
      apiKey: accessToken,
    });
    const env = this.configService.get("env");
    const webhookProdUrl =
      this.configService.get("api_url") + "/sheet/webhook";
    const webhookDevUrl =
      "https://765d-78-126-205-77.eu.ngrok.io/sheet/webhook";
    const finalUrl = env === "production" ? webhookProdUrl : webhookDevUrl;
    await sheetClient.createWebhook({
      url: finalUrl,
      resourceTypes: ["Issue", "Project"],
      teamId: teamId,
    });
    return {
      message: "webhook_created",
    };
  }*/

  async createDrafts(
    userId: number,
    createDraftInput: createDraftInput,
  ): Promise<any> {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      'google',
      true,
    )
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get('google.client_id'),
      this.configService.get('google.client_secret'),
      this.configService.get('google.callback_url'),
    )
    oauth2Client.setCredentials({ access_token: accessToken })
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })
    const message = btoa(
      'To: ' +
        createDraftInput.gmail_draft_to +
        '\r\n' +
        'Subject: ' +
        createDraftInput.gmail_draft_subject +
        '\r\n\r\n' +
        createDraftInput.gmail_draft_body,
    )
    const res = await gmail.users.drafts.create({
      userId: 'me',
      requestBody: {
        id: 'me',
        message: {
          raw: message,
        },
      },
    })
    return {
      message: 'draft_created',
      data: res,
    }
  }

  async sendMail(
    userId: number,
    createMailInput: createMailInput,
  ): Promise<any> {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      'google',
      true,
    )
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get('google.client_id'),
      this.configService.get('google.client_secret'),
      this.configService.get('google.callback_url'),
    )
    oauth2Client.setCredentials({ access_token: accessToken })
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })
    const message = btoa(
      'To: ' +
        createMailInput.gmail_mail_to +
        '\r\n' +
        'Subject: ' +
        createMailInput.gmail_mail_subject +
        '\r\n\r\n' +
        createMailInput.gmail_mail_body,
    )
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: message,
      },
    })
    return {
      message: 'send_mail',
      data: res,
    }
  }

}
