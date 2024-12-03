import { Module } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { PrismaService } from '../prisma.service'
import { NgrokService } from '../ngrok'
import { LinearService } from './linear.service'
import { LinearController } from './linear.controller'

@Module({
  imports: [],
  controllers: [LinearController],
  providers: [LinearService, UserService, PrismaService, NgrokService],
  exports: [LinearService],
})
export class LinearModule {}
