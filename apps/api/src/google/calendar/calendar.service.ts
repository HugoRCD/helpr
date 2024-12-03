import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { google } from 'googleapis'
import { LinearClient } from '@linear/sdk'
import { PrismaService } from '../../prisma.service'
import { UserService } from '../../user/user.service'
import { ProviderService } from '../../provider/provider.service'
import { FlowService } from '../../flow/flow.service'
import { createCalendarInput, createEventInput } from './calendar.type'

@Injectable()
export class CalendarService {

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private flowService: FlowService,
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

  async createCalendar(
    userId: number,
    createCalendarInput: createCalendarInput,
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
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
    const res = await calendar.calendars.insert({
      requestBody: {
        summary: createCalendarInput.calendar_calendar_summary,
        location: createCalendarInput.calendar_calendar_location,
        description: createCalendarInput.calendar_calendar_description,
        timeZone: createCalendarInput.calendar_calendar_timezone,
      },
    })
    return {
      message: 'calendar_created',
      data: res.data,
    }
  }

  async createEvent(
    userId: number,
    createEventInput: createEventInput,
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
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await calendar.events.insert({
      calendarId: createEventInput.calendar_event_calendar_id,
      resource: {
        summary: createEventInput.calendar_event_summary,
        location: createEventInput.calendar_event_location,
        description: createEventInput.calendar_event_description,
        start: {
          dateTime: createEventInput.calendar_event_start_date_time,
          timeZone: createEventInput.calendar_event_timezone,
        },
        end: {
          dateTime: createEventInput.calendar_event_end_date_time,
          timeZone: createEventInput.calendar_event_timezone,
        },
      },
    })
    return {
      message: 'event_created',
      data: res,
    }
  }

  async getData(userId: number, variables: any) {
    let calendarId = ''
    if (variables && variables.calendar_event_calendar_id) {
      calendarId = variables.calendar_event_calendar_id
    }
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
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
    const res = await calendar.calendarList.list({
      minAccessRole: 'writer',
    })
    const calendars = res.data.items
    const calendarList = calendars.map((calendar) => {
      return { name: calendar.summary, value: calendar.id }
    })
    return {
      calendar_event_calendar_id: calendarList,
    }
  }

}
