import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  Body, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { RoleGuard } from '../auth/guards/role.guard'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { JwtPayload } from '../auth/auth.service'
import { FlowService } from './flow.service'
import { createFlowInput, Trigger } from './flow.type'

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('Flow')
@Controller('flow')
export class FlowController {

  constructor(private readonly flowService: FlowService) {}

  @Get()
  async getFlows(@CurrentUser() user: JwtPayload) {
    return await this.flowService.getUserFlows(user.id)
  }

  @Get('/:id')
  async getFlow(@Param('id', ParseIntPipe) id: number) {
    return await this.flowService.getFlowById(id)
  }

  @Get('/user/:id')
  async getFlowByUser(@Param('id', ParseIntPipe) id: number) {
    return await this.flowService.getUserFlows(id, true)
  }

  @Get('get-flows')
  async getFlowsByTrigger(trigger: Trigger) {
    return await this.flowService.getFlowsToRun(trigger)
  }

  @Post()
  async addFlow(
    @CurrentUser() user: JwtPayload,
    @Body() flow: createFlowInput,
  ) {
    return await this.flowService.addFlow(user.id, flow)
  }

  @Put(':id/status')
  async updateFlowEnabled(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body('enabled') enabled: boolean,
  ) {
    return await this.flowService.updateFlowEnabled(user.id, id, enabled)
  }

  @Put(':id/public')
  async updateFlowPublic(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body('public') isPublic: boolean,
  ) {
    return await this.flowService.updateFlowPublic(user.id, id, isPublic)
  }

  @Delete(':id')
  async deleteFlow(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.flowService.deleteFlow(user.id, id)
  }

}
