import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { NotionService } from "./notion.service";
import { JwtPayload } from "../auth/auth.service";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import {
  createDatabaseInput,
  createItemInDatabaseInput,
  createComment,
} from "./notion.type";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags("Notion")
@Controller("notion")
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Post("add-credentials")
  async createCredential(
    @CurrentUser() user: JwtPayload,
    @Body("accessToken") accessToken: string,
  ) {
    return await this.notionService.createCredentials(user.id, accessToken);
  }

  @Post("create-item")
  async createItemInDatabase(
    @CurrentUser() user: JwtPayload,
    @Body() page: createItemInDatabaseInput,
  ) {
    return await this.notionService.createItemInDatabase(user.id, page);
  }

  @Post("create-comment")
  async createComment(
    @CurrentUser() user: JwtPayload,
    @Body() comment: createComment,
  ) {
    return await this.notionService.createComment(user.id, comment);
  }

  @Post("create-database")
  async createDatabase(
    @CurrentUser() user: JwtPayload,
    @Body() database: createDatabaseInput,
  ) {
    return await this.notionService.createDatabase(user.id, database);
  }
}
