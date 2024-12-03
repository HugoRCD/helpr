import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { PrismaService } from '../prisma.service'
import { ResetPasswordService } from './reset-password.service'
import { ResetPasswordController } from './reset-password.controller'

@Module({
  imports: [UserModule],
  providers: [ResetPasswordService, PrismaService],
  controllers: [ResetPasswordController],
})
export class ResetPasswordModule {}
