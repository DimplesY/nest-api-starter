import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { __secret } from './auth.module'
import { AuthService } from './auth.service'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { PrismaService } from '~/processors/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: __secret,
      ignoreExpiration: false,
    } as StrategyOptions)
  }

  async validate(payload: JwtPayload) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: payload.id,
      },
    })
    if (user) {
      return user
    }
    throw new UnauthorizedException('身份已过期')
  }
}
