import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { isArrayLike, omit } from 'lodash'
import { Observable, map } from 'rxjs'
import {
  OMIT_RESPONSE_PROTECT_KEYS,
  RESPONSE_PASSTHROUGH_METADATA,
} from '~/constants/system.constant'

export interface Response<T> {
  data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    if (!context.switchToHttp().getRequest()) {
      return next.handle()
    }

    const handler = context.getHandler()
    // 跳过 bypass 装饰的请求
    const bypass = this.reflector.get<boolean>(
      RESPONSE_PASSTHROUGH_METADATA,
      handler,
    )
    if (bypass) {
      return next.handle()
    }

    const omitKeys = this.reflector.getAllAndOverride(
      OMIT_RESPONSE_PROTECT_KEYS,
      [handler, context.getClass()],
    )

    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'undefined') {
          context.switchToHttp().getResponse().status(204)
          return data
        }

        if (Array.isArray(omitKeys)) {
          data = omit(data, omitKeys)
        }

        return isArrayLike(data) ? { data } : data
      }),
    )
  }
}
