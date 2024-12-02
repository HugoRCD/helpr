import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";
import { DeeplService } from "./deepl.service";
import { DeeplController } from "./deepl.controller";

@Module({
  imports: [],
  controllers: [DeeplController],
  providers: [DeeplService, UserService, PrismaService],
  exports: [DeeplService],
})
export class DeeplModule {}
