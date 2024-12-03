import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { google } from 'googleapis'
import { PrismaService } from '../../prisma.service'
import { UserService } from '../../user/user.service'
import { ProviderService } from '../../provider/provider.service'
import { createSheetInput, updateSheetTitleInput } from './sheet.type'

@Injectable()
export class SheetService {

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private providerService: ProviderService,
  ) {}

  async createSheet(
    userId: number,
    createSheetInput: createSheetInput,
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
    const spreadsheetBody = {
      properties: {
        title: createSheetInput.sheet_create_title,
      },
    }
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client })
    const res = await sheets.spreadsheets.create({
      requestBody: spreadsheetBody,
    })
    return {
      message: 'sheet_created',
      data: res,
    }
  }

  async updateSheet(
    userId: number,
    updateSheetTitleInput: updateSheetTitleInput,
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
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client })
    const idSheet = await sheets.spreadsheets.get({
      spreadsheetId: updateSheetTitleInput.sheet_update_id,
    })
    if (!idSheet) {
      throw new BadRequestException('sheet_not_found')
    }
    const res = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: updateSheetTitleInput.sheet_update_id,
      requestBody: {
        requests: [
          {
            updateSpreadsheetProperties: {
              properties: {
                title: updateSheetTitleInput.sheet_update_title,
              },
              fields: 'title',
            },
          },
        ],
      },
    })
    return {
      message: 'sheet_updated',
      data: res,
    }
  }

}
