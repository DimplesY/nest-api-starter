import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { sleep } from '~/shared/utils/tool.utils'
import { BizException } from '~/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '~/constants/error-code.constant'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { User } from '@prisma/client'
import { DatabaseService } from '~/processors/database/database.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  get jwtServicePublic() {
    return this.jwtService
  }

  async validateUsernameAndPassword(username: string, password: string) {
    const user = await this.db.prisma.user.findFirst({
      where: {
        username,
        password,
      },
    })

    if (!user || !compareSync(password, user.password)) {
      await sleep(3000)
      throw new BizException(ErrorCodeEnum.AuthFail)
    }
    return user
  }

  async signToken(id: string) {
    const payload: JwtPayload = {
      id,
    }

    return this.jwtService.sign(payload)
  }

  async getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode<JwtPayload>(token)['id']
    return this.db.prisma.user.findUniqueOrThrow({ where: { id } })
  }

  async verifyPayload(payload: JwtPayload): Promise<boolean> {
    console.log(payload)
    return true
  }
}
