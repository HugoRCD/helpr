import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";
import { LinearService } from "./linear.service";
import { LinearController } from "./linear.controller";
import { NgrokService } from "../ngrok";

@Module({
  imports: [],
  controllers: [LinearController],
  providers: [LinearService, UserService, PrismaService, NgrokService],
  exports: [LinearService],
})
export class LinearModule {}
