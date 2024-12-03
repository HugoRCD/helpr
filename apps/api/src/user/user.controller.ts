import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { RoleGuard } from '../auth/guards/role.guard'
import { Role, Roles } from '../auth/decorators/role.decorator'
import { JwtPayload } from '../auth/auth.service'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { formatUser } from '../utils'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('User')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

  @Get('/current')
  async getCurrentUser(@CurrentUser() user: JwtPayload): Promise<User> {
    return formatUser(await this.userService.getUserById(user.id))
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<User> {
    return this.userService.getUserById(userId)
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @Post('verify')
  async sendNewToken(
    @CurrentUser() user: JwtPayload,
  ): Promise<{ message: string }> {
    await this.userService.createVerificationUrl(user, true)
    return {
      message: 'new_token_sent',
    }
  }

  @Post('/verify/:token')
  async verifyUser(
    @CurrentUser() user: JwtPayload,
    @Param('token') token: string,
  ) {
    return this.userService.verifyEmail(user.id, token)
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto)
  }

  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId)
  }

}
