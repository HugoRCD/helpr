import { Module } from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { PrismaService } from '../../prisma.service'
import { GmailService } from './gmail.service'
import { GmailController } from './gmail.controller'

@Module({
  imports: [],
  controllers: [GmailController],
  providers: [GmailService, UserService, PrismaService],
  exports: [GmailService],
})
export class GmailModule {}
