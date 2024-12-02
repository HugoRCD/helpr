import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Public } from "../../auth/decorators/public.decorator";
import { CalendarService } from "./calendar.service";
import { JwtPayload } from "../../auth/auth.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { createCalendarInput, createEventInput } from "./calendar.type";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags("Calendar")
@Controller("calendar")
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  /*  @Public()
  @Post("webhook")
  async webhook(@Body() body) {
    return await this.calendarService.handleWebhook(body);
  }

  @Post("create-webhook")
  async createWebhook(
    @CurrentUser() user: JwtPayload,
    @Body("teamId") teamId: string,
  ) {
    return await this.calendarService.createWebhook(user.id, teamId);
  }*/

  @Post("data")
  async getData(
    @CurrentUser() user: JwtPayload,
    @Body("variables") variables: string,
  ) {
    return await this.calendarService.getData(user.id, variables);
  }

  @Post("create-calendar")
  async createCalendar(
    @CurrentUser() user: JwtPayload,
    @Body() calendar: createCalendarInput,
  ) {
    return await this.calendarService.createCalendar(user.id, calendar);
  }

  @Post("create-event")
  async createEvent(
    @CurrentUser() user: JwtPayload,
    @Body() event: createEventInput,
  ) {
    return await this.calendarService.createEvent(user.id, event);
  }
}
