import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '~/processors/prisma/prisma.service'
import { compareSync } from 'bcrypt'
import { sleep } from '~/shared/utils/tool.utils'
import { BizException } from '~/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '~/constants/error-code.constant'
import { JwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  get jwtServicePublic() {
    return this.jwtService
  }

  async validateUsernameAndPassword(username: string, password: string) {
    const user = await this.prismaService.user.findFirst({
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

  async verifyPayload(payload: JwtPayload): Promise<boolean> {
    console.log(payload)
    return true
  }
}
