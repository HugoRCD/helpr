import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { JwtPayload } from "../auth/auth.service";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import {
  createCustomerInput,
  createPaymentInput,
  createProductInput,
  createLinkInput,
} from "./stripe.type";
import { Public } from "../auth/decorators/public.decorator";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags("Stripe")
@Controller("stripe")
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Public()
  @Post("webhook")
  async webhook(@Body() body) {
    return await this.stripeService.handleWebhook(body);
  }

  @Post("create-webhook")
  async createWebhook(@CurrentUser() user: JwtPayload) {
    return await this.stripeService.createWebhook(user.id);
  }

  @Post("add-credentials")
  async createCredential(
    @CurrentUser() user: JwtPayload,
    @Body("accessToken") accessToken: string,
  ) {
    return await this.stripeService.createCredentials(user.id, accessToken);
  }

  @Post("create-customer")
  async createCustomer(
    @CurrentUser() user: JwtPayload,
    @Body() customer: createCustomerInput,
  ) {
    return await this.stripeService.createCustomer(user.id, customer);
  }

  @Post("create-payment")
  async createPayment(
    @CurrentUser() user: JwtPayload,
    @Body() payment: createPaymentInput,
  ) {
    return await this.stripeService.createPayment(user.id, payment);
  }

  @Post("create-product")
  async createProduct(
    @CurrentUser() user: JwtPayload,
    @Body() product: createProductInput,
  ) {
    return await this.stripeService.createProduct(user.id, product);
  }

  @Post("create-link")
  async createLink(
    @CurrentUser() user: JwtPayload,
    @Body() link: createLinkInput,
  ) {
    return await this.stripeService.createLink(user.id, link);
  }
}
