import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma.service";
import { UserService } from "../user/user.service";
import { ProviderService } from "../provider/provider.service";
import { google } from "googleapis";

@Injectable()
export class GoogleService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private providerService: ProviderService,
  ) {}

  async createCredentials(userId: number, accessToken: string) {
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get("google.client_id"),
      this.configService.get("google.client_secret"),
      this.configService.get("google.callback_url"),
    );
    oauth2Client.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const userID = await gmail.users.getProfile({ userId: "me" });
    await this.providerService.addCredentials(
      userId,
      userID.data.emailAddress,
      "google",
      accessToken,
    );
    return {
      message: "credentials_created",
    };
  }
}
