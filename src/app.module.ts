import { DynamicModule, Module, NestModule, Type } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import chalk from 'chalk'
import { consola } from 'consola'
import { ZodValidationPipe } from 'nestjs-zod'
import { AllExceptionsFilter } from './common/filters/any-exception.filter'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { logBanner } from './global/index.global'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { DatabaseModule } from './processors/database/database.module'
import { HelperModule } from './processors/helper/helper.module'
import { RedisModule } from './processors/redis/redis.module'

@Module({
  imports: [DatabaseModule, RedisModule, HelperModule, UserModule, AuthModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
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
  static register(showBanner: boolean): DynamicModule {
    showBanner && logBanner()
    consola.log(
      `
      ${chalk.cyan('当前环境:')} ${process.env.NODE_ENV}
    `,
    )
    return {
      module: AppModule,
      imports: [].filter(Boolean) as Type<NestModule>[],
    }
  }
}
