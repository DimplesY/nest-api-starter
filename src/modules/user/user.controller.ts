import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { Bypass, Paginator } from '~/common/decorators/http.decorator'
import { UserCreateRequest } from './request/user-register.request'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userCreateRequest: UserCreateRequest) {
    return this.userService.create(userCreateRequest)
  }

  @Get()
  @Paginator
  async findAll(@Query('_take') take: number, @Query('_skip') skip: number) {
    const result = await this.userService.findAll({
      take,
      skip,
    })
    return result
  }

  @Post('/bypass')
  @Bypass
  async bypass() {
    return {
      code: 200,
      message: 'success',
    }
  }
}
