import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MailingModule } from '../mailing/mailing.module'
import { UserService } from '../user/user.service'
import { PrismaService } from '../prisma.service'
import { ProviderService } from './provider.service'
import { ProviderController } from './provider.controller'

@Global()
@Module({
  imports: [MailingModule, JwtModule],
  controllers: [ProviderController],
  providers: [ProviderService, UserService, PrismaService],
  exports: [ProviderService],
})
export class ProviderModule {}
