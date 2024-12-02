import { Module } from "@nestjs/common";
import { MailingModule } from "../mailing/mailing.module";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";
import { GithubService } from "./github.service";
import { GithubController } from "./github.controller";

@Module({
  imports: [MailingModule],
  controllers: [GithubController],
  providers: [GithubService, UserService, PrismaService],
  exports: [GithubService],
})
export class GithubModule {}
