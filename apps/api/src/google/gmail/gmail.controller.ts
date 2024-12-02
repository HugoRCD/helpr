import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Public } from "../../auth/decorators/public.decorator";
import { GmailService } from "./gmail.service";
import { JwtPayload } from "../../auth/auth.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { createDraftInput, createMailInput } from "./gmail.type";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags("Gmail")
@Controller("gmail")
export class GmailController {
  constructor(private readonly sheetService: GmailService) {}

  /*  @Public()
  @Post("webhook")
  async webhook(@Body() body) {
    return await this.sheetService.handleWebhook(body);
  }

  @Post("create-webhook")
  async createWebhook(
    @CurrentUser() user: JwtPayload,
    @Body("teamId") teamId: string,
  ) {
    return await this.sheetService.createWebhook(user.id, teamId);
  }*/

  @Post("create-draft")
  async createDrafts(
    @CurrentUser() user: JwtPayload,
    @Body() draft: createDraftInput,
  ) {
    return await this.sheetService.createDrafts(user.id, draft);
  }

  @Post("send-mail")
  async sendMail(
    @CurrentUser() user: JwtPayload,
    @Body() mail: createMailInput,
  ) {
    return await this.sheetService.sendMail(user.id, mail);
  }
}
