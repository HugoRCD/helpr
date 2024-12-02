import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";
import { GoogleService } from "./google.service";
import { GoogleController } from "./google.controller";

@Module({
  imports: [],
  controllers: [GoogleController],
  providers: [GoogleService, UserService, PrismaService],
  exports: [GoogleService],
})
export class GoogleModule {}
