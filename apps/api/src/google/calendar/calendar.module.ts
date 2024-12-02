import { Module } from "@nestjs/common";
import { UserService } from "../../user/user.service";
import { PrismaService } from "../../prisma.service";
import { CalendarService } from "./calendar.service";
import { CalendarController } from "./calendar.controller";

@Module({
  imports: [],
  controllers: [CalendarController],
  providers: [CalendarService, UserService, PrismaService],
  exports: [CalendarService],
})
export class CalendarModule {}
