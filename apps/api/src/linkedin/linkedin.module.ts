import { Module } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { PrismaService } from '../prisma.service'
import { LinkedinService } from './linkedin.service'
import { LinkedinController } from './linkedin.controller'

@Module({
  imports: [],
  controllers: [LinkedinController],
  providers: [LinkedinService, UserService, PrismaService],
  exports: [LinkedinService],
})
export class LinkedinModule {}
