import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common'
import { Auth } from '~/common/decorators/auth.decorator'
import { Bypass, ProtectKeys } from '~/common/decorators/http.decorator'
import { PagerDto } from '~/shared/dto/pager.dto'
import { AuthService } from '../auth/auth.service'
import { UserLoginRequest } from './request/user-login.request'
import { UserCreateRequest } from './request/user-register.request'
import { UserService } from './user.service'
import { UserSchemaSerializeProjection } from './user.protect'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() userCreateRequest: UserCreateRequest) {
    return this.userService.create(userCreateRequest)
  }

  @Auth()
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

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ProtectKeys(UserSchemaSerializeProjection.keys)
  async login(@Body() userLoginRequest: UserLoginRequest) {
    const { username, password } = userLoginRequest
    const user = await this.authService.validateUsernameAndPassword(
      username,
      password,
    )

    const jwt = await this.authService.signToken(user.id)

    return {
      authToken: jwt,
      ...user,
    }
  }
}
