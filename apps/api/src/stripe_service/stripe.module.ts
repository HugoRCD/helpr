import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";
import { StripeService } from "./stripe.service";
import { StripeController } from "./stripe.controller";

@Module({
  imports: [],
  controllers: [StripeController],
  providers: [StripeService, UserService, PrismaService],
  exports: [StripeService],
})
export class StripeModule {}
