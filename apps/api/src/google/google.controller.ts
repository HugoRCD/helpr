import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { RoleGuard } from '../auth/guards/role.guard'
import { Public } from '../auth/decorators/public.decorator'
import { JwtPayload } from '../auth/auth.service'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { GoogleService } from './google.service'

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('Google')
@Controller('google')
export class GoogleController {

  constructor(private readonly googleService: GoogleService) {}

  @Post('add-credentials')
  async createCredential(
    @CurrentUser() user: JwtPayload,
    @Body('accessToken') accessToken: string,
  ) {
    return await this.googleService.createCredentials(user.id, accessToken)
  }

}
