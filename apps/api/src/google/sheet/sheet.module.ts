import { Module } from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { PrismaService } from '../../prisma.service'
import { SheetService } from './sheet.service'
import { SheetController } from './sheet.controller'

@Module({
  imports: [],
  controllers: [SheetController],
  providers: [SheetService, UserService, PrismaService],
  exports: [SheetService],
})
export class SheetModule {}
