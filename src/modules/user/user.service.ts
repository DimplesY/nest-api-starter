import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { isArrayLike } from 'lodash'
import { DatabaseService } from '~/processors/database/database.service'
import { UserCreateRequest } from './request/user-register.request'
import { PagerDto } from '~/shared/dto/pager.dto'

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  create(UserCreateRequest: UserCreateRequest) {
    return this.db.prisma.user.create({
      data: {
        ...UserCreateRequest,
      },
    })
  }

  async findAll(query: PagerDto) {
    const { size = 10, page = 1 } = query
    const result = await this.db.prisma.user.paginate(
      {
        include: {
          userList: true,
        },
        orderBy: {
          createdTime: 'desc',
        },
      },
      { size, page },
    )

    return result
  }

  async findOne(id: string) {
    const dbUser = await this.db.prisma.user.findUniqueOrThrow({
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
