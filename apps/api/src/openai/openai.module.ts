import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";
import { OpenaiService } from "./openai.service";
import { OpenaiController } from "./openai.controller";

@Module({
  imports: [],
  controllers: [OpenaiController],
  providers: [OpenaiService, UserService, PrismaService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
