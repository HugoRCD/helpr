import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";
import { SlackService } from "./slack.service";
import { SlackController } from "./slack.controller";

@Module({
  imports: [],
  controllers: [SlackController],
  providers: [SlackService, UserService, PrismaService],
  exports: [SlackService],
})
export class SlackModule {}
