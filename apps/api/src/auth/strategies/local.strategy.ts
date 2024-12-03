import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { User } from '@prisma/client'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
    })
  }

  async validate(login: string, password: string): Promise<User> {
    return await this.authService.validateUser(login, password)
  }

}
