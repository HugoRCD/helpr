import { Module } from '@nestjs/common'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'
import { PrismaService } from '../prisma.service'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, PrismaService],
  exports: [UserService],
})
export class UserModule {}
