import { AuthService } from '~/modules/auth/auth.service'
import { UserService } from '~/modules/user/user.service'
import { getNestExecutionContextRequest } from '~/transformers/get-req.transformer'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

function isJWT(token: string): boolean {
  const parts = token.split('.')
  return (
    parts.length === 3 &&
    /^[a-zA-Z0-9_-]+$/.test(parts[0]) &&
    /^[a-zA-Z0-9_-]+$/.test(parts[1]) &&
    /^[a-zA-Z0-9_-]+$/.test(parts[2])
  )
}

/**
 * JWT auth guard
 */

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  private authService: AuthService

  @Inject(UserService)
  private userService: UserService

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = this.getRequest(context)

    const query = request.query as any
    const headers = request.headers
    const Authorization: string =
      headers.authorization || headers.Authorization || query.token

    if (!Authorization) {
      throw new UnauthorizedException('未登录')
    }

    const jwt = Authorization.replace(/[Bb]earer /, '')

    if (!isJWT(jwt)) {
      throw new UnauthorizedException('令牌无效')
    }
    const ok = await this.authService.jwtServicePublic.verify(jwt)
    if (!ok) {
      throw new UnauthorizedException('身份过期')
    }

    const user = await this.authService.getUserFromToken(jwt)

    request.owner = user
    request.token = jwt
    return true
  }

  private getRequest(context: ExecutionContext) {
    return getNestExecutionContextRequest(context)
  }
}
