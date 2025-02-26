import { Body, Controller, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ResetPasswordService } from './reset-password.service'

@ApiTags('Reset Password')
@Controller('reset-password')
export class ResetPasswordController {

  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post()
  async forgotPassword(@Body('email') email: string) {
    return await this.resetPasswordService.createResetToken(email)
  }

  @Post(':token')
  async resetPassword(
    @Body('password') password: string,
    @Param('token') token: string,
  ) {
    return await this.resetPasswordService.resetPassword(token, password)
  }

}
