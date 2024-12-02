import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Module,
  NestInterceptor,
} from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { MailingModule } from "./mailing/mailing.module";
import { CronModule } from "./cron/cron.module";
import { AuthModule } from "./auth/auth.module";
import { ResetPasswordModule } from "./reset-password/reset-password.module";
import { config } from "../config";
import { StripeModule } from "./stripe_service/stripe.module";
import { LinearModule } from "./linear/linear.module";
import { GithubModule } from "./github/github.module";
import { SlackModule } from "./slack/slack.module";
import { ProviderModule } from "./provider/provider.module";
import { catchError, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { FlowModule } from "./flow/flow.module";
import { NotionModule } from "./notion/notion.module";
import { OpenaiModule } from "./openai/openai.module";
import { GmailModule } from "./google/gmail/gmail.module";
import { CalendarModule } from "./google/calendar/calendar.module";
import { GoogleModule } from "./google/google.module";
import { SheetModule } from "./google/sheet/sheet.module";
import { DeeplModule } from "./deepl/deepl.module";
import { LinkedinModule } from "./linkedin/linkedin.module";

export interface ServerResponse<T> {
  statusCode?: number;
  message: string;
  data?: T;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ServerResponse<any>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map((data) => {
        return { statusCode, message: "success", data };
      }),
      catchError((error) => {
        const message = error.message || "unknown_error";
        const statusCode = error.statusCode || 500;
        return of({ statusCode, message, error });
      }),
    );
  }
}

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    ProviderModule,
    FlowModule,
    UserModule,
    MailingModule,
    CronModule,
    AuthModule,
    ResetPasswordModule,
    StripeModule,
    NotionModule,
    GithubModule,
    SlackModule,
    LinearModule,
    OpenaiModule,
    GoogleModule,
    GmailModule,
    CalendarModule,
    SheetModule,
    DeeplModule,
    LinkedinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
