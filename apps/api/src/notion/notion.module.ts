import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";
import { NotionService } from "./notion.service";
import { NotionController } from "./notion.controller";

@Module({
  imports: [],
  controllers: [NotionController],
  providers: [NotionService, UserService, PrismaService],
  exports: [NotionService],
})
export class NotionModule {}
