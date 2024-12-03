import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { RoleGuard } from '../auth/guards/role.guard'
import { JwtPayload } from '../auth/auth.service'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { DeeplService } from './deepl.service'
import { translateTextInput } from './deepl.type'

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('Deepl')
@Controller('deepl')
export class DeeplController {

  constructor(private readonly deeplService: DeeplService) {}

  @Post()
  async translate(
    @Body('text') text: string,
    @Body('from') from: string,
    @Body('to') to: string,
  ) {
    return await this.deeplService.translate(text, from, to)
  }

  @Post('data')
  async getData() {
    return await this.deeplService.getData()
  }

  @Post('translate')
  async translateText(
    @CurrentUser() user: JwtPayload,
    @Body() text: translateTextInput,
  ) {
    return await this.deeplService.translateText(user.id, text)
  }

}
