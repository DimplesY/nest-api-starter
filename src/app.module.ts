import { DynamicModule, Module, NestModule, Type } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import chalk from 'chalk'
import { consola } from 'consola'
import { ZodValidationPipe } from 'nestjs-zod'
import { AllExceptionsFilter } from './common/filters/any-exception.filter'
import { PageQueryInterceptor } from './common/interceptors/page-query.interceptor'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { logBanner, showBanner } from './global/index.global'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { HelperModule } from './processors/helper/helper.module'
import { PrismaModule } from './processors/prisma/prisma.module'
import { RedisModule } from './processors/redis/redis.module'

@Module({
  imports: [PrismaModule, RedisModule, HelperModule, UserModule, AuthModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PageQueryInterceptor,
    },

    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  static register(isInit: boolean): DynamicModule {
    showBanner && logBanner()
    consola.log(
      `
      ${chalk.cyan('当前环境初始化状态:')} ${isInit}
    `,
    )
    return {
      module: AppModule,
      imports: [].filter(Boolean) as Type<NestModule>[],
    }
  }
}
