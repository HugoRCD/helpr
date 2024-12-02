import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Public } from "../../auth/decorators/public.decorator";
import { SheetService } from "./sheet.service";
import { JwtPayload } from "../../auth/auth.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { createSheetInput, updateSheetTitleInput } from "./sheet.type";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags("Sheet")
@Controller("sheet")
export class SheetController {
  constructor(private readonly sheetService: SheetService) {}

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

  @Post("create-sheet")
  async createSheet(
    @CurrentUser() user: JwtPayload,
    @Body() sheet: createSheetInput,
  ) {
    return await this.sheetService.createSheet(user.id, sheet);
  }

  @Post("update-sheet")
  async updateSheet(
    @CurrentUser() user: JwtPayload,
    @Body() sheet: updateSheetTitleInput,
  ) {
    return await this.sheetService.updateSheet(user.id, sheet);
  }
}
