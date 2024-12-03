import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ResetPassword } from '@prisma/client'
import { MailingService } from '../mailing/mailing.service'
import { UserService } from '../user/user.service'
import { PrismaService } from '../prisma.service'
import { generateCode } from '../utils'

@Injectable()
export class ResetPasswordService {

  constructor(
    private prisma: PrismaService,
    private readonly mailingService: MailingService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async createResetToken(email: string): Promise<{ message: string }> {
    const user = await this.userService.getUserByLogin(email)
    if (!user) {
      throw new BadRequestException('user_not_found')
    }
    const resetEntity: ResetPassword = await this.prisma.resetPassword.create({
      data: {
        userId: user.id,
        token: await generateCode(),
      },
    })
    const url = `${this.configService.get('frontend_url')}/reset-password-${
      resetEntity.token
    }`
    await this.mailingService.sendResetPassword(user, url)
    return {
      message: 'reset_password_email_sent',
    }
  }

  async resetPassword(
    token: string,
    password: string,
  ): Promise<{ message: string }> {
    const resetEntity = await this.prisma.resetPassword.findFirst({
      where: {
        token,
      },
    })
    if (!resetEntity) {
      throw new BadRequestException('invalid_token')
    }
    await this.prisma.user.update({
      where: {
        id: resetEntity.userId,
      },
      data: {
        password: password,
      },
    })
    await this.prisma.resetPassword.delete({
      where: {
        id: resetEntity.id,
      },
    })
    return {
      message: 'password_reset_success',
    }
  }

}
