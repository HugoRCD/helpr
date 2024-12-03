import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { UserService } from '../user/user.service'
import { PrismaService } from '../prisma.service'

export type JwtPayload = {
  id: number;
  role: number;
  email: string;
  username: string;
}

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private createJwtPayload(user): JwtPayload {
    return {
      id: user.id,
      role: user.role,
      email: user.email,
      username: user.username,
    }
  }

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.userService.getUserByLogin(login)
    if (!user || password !== user.password) {
      throw new BadRequestException('invalid_credentials')
    }
    return user
  }

  async createAccessToken(user, expire = true): Promise<string> {
    const payload = this.createJwtPayload(user)
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.auth_token_secret'),
      expiresIn: expire
        ? this.configService.get('jwt.auth_token_expiration')
        : 0,
    })
  }

  async createRefreshToken(user): Promise<string> {
    const payload = this.createJwtPayload(user)
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.refresh_token_secret'),
      expiresIn: this.configService.get('jwt.refresh_token_expiration'),
    })
  }

  async refreshToken(request): Promise<User> {
    const { refreshToken } = request.cookies
    if (!refreshToken) {
      throw new UnauthorizedException('refresh_token_not_provided')
    }
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('jwt.refresh_token_secret'),
    })
    const user = await this.userService.getUserById(payload.id)
    const decryptedRefreshToken = refreshToken === user.refreshToken
    const authToken = await this.createAccessToken(user)
    if (decryptedRefreshToken) {
      return await this.prisma.user.update({
        where: { id: payload.id },
        data: {
          authToken,
        },
      })
    }
    throw new UnauthorizedException('invalid_refresh_token')
  }

}
