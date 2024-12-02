import { Module } from "@nestjs/common";
import { CronService } from "./cron.service";
import { FlowService } from "../flow/flow.service";
import { PrismaService } from "../prisma.service";
import { UserService } from "../user/user.service";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [],
  providers: [
    CronService,
    FlowService,
    PrismaService,
    UserService,
    AuthService,
    JwtService,
  ],
  exports: [CronService],
})
export class CronModule {}
