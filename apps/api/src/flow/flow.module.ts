import { Global, Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { ProviderService } from '../provider/provider.service'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
import { FlowService } from './flow.service'
import { FlowController } from './flow.controller'

@Global()
@Module({
  imports: [AuthModule],
  controllers: [FlowController],
  providers: [
    FlowService,
    UserService,
    PrismaService,
    ProviderService,
    AuthService,
    JwtService,
  ],
  exports: [FlowService],
})
export class FlowModule {}
