import { Injectable } from '@nestjs/common'
import { DatabaseService } from '~/processors/database/database.service'
import { PagerDto } from '~/shared/dto/pager.dto'
import { AuthService } from '../auth/auth.service'
import { UserCreateRequest } from './request/user-register.request'

@Injectable()
export class UserService {
  constructor(
    private readonly db: DatabaseService,
    private readonly authService: AuthService,
  ) {}

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
    const user = await this.db.prisma.user.findUniqueOrThrow({
      where: { id },
    })
    return user
  }

  update(id: number) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
