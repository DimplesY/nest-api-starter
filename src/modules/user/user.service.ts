import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { isArrayLike } from 'lodash'
import { PrismaService } from '~/processors/prisma/prisma.service'
import { UserCreateRequest } from './request/user-register.request'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(UserCreateRequest: UserCreateRequest) {
    return this.prismaService.user.create({
      data: {
        ...UserCreateRequest,
      },
    })
  }

  async findAll(param: Prisma.UserFindManyArgs) {
    const [dbUserList, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany(param),
      this.prismaService.user.count({ where: param.where }),
    ])

    const userList = this.transformUserList(dbUserList)

    return [userList, total]
  }

  async findOne(id: string) {
    const dbUser = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    })
    const user = this.transformUser(dbUser)
    return user
  }

  update(id: number) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  private transformUser(user: User) {
    return {
      ...user,
      createdTime: user.createdTime.getTime(),
    }
  }

  private transformUserList(userList: User[]) {
    if (!isArrayLike(userList)) {
      return []
    }
    return userList.map((user) => this.transformUser(user))
  }
}
