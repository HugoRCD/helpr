import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { RoleGuard } from '../auth/guards/role.guard'
import { JwtPayload } from '../auth/auth.service'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { ProviderService } from './provider.service'
import {
  createActionInput,
  createProviderInput,
  createTriggerInput,
} from './provider.type'

@ApiTags('Provider')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('provider')
export class ProviderController {

  constructor(private readonly providerService: ProviderService) {}

  @Get('/providers')
  async getProviders() {
    return this.providerService.getProviders()
  }

  @Get('/get-credentials')
  async getCredentials(@CurrentUser() user: JwtPayload) {
    return this.providerService.getCredentials(user.id)
  }

  @Get('/get-available-actions')
  async getAvailableActions() {
    return await this.providerService.getAvailableActions()
  }

  @Get('/get-available-triggers')
  async getAvailableTriggers() {
    return await this.providerService.getAvailableTriggers()
  }

  @Get('/user')
  async getUserProviders(@CurrentUser() user: JwtPayload) {
    return this.providerService.getUserProviders(user.id)
  }

  @Post('/provider')
  async manageProvider(@Body() provider: createProviderInput) {
    return this.providerService.createOrUpdateProvider(provider)
  }

  @Post('/action')
  async manageAction(@Body() action: createActionInput) {
    return this.providerService.createOrUpdateAction(action)
  }

  @Post('/trigger')
  async manageTrigger(@Body() trigger: createTriggerInput) {
    return this.providerService.createOrUpdateTrigger(trigger)
  }

  @Delete('/deconnect')
  async deconnectProvider(
    @CurrentUser() user: JwtPayload,
    @Body('provider') provider: string,
  ) {
    return this.providerService.deconnectProvider(user.id, provider)
  }

}
