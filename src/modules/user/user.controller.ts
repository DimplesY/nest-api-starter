import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { Bypass } from '~/common/decorators/http.decorator'
import { UserCreateRequest } from './request/user-register.request'
import { UserService } from './user.service'
import { PagerDto } from '~/shared/dto/pager.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userCreateRequest: UserCreateRequest) {
    return this.userService.create(userCreateRequest)
  }

  @Get()
  async findAll(@Query() query: PagerDto) {
    return this.userService.findAll(query)
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
