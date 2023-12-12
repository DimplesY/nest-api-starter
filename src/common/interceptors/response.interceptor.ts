import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, map } from 'rxjs'
import { isArrayLike } from 'lodash'
import { RESPONSE_PASSTHROUGH_METADATA } from '~/constants/system.constant'

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
    const handler = context.getHandler()
    // 跳过 bypass 装饰的请求
    const bypass = this.reflector.get<boolean>(
      RESPONSE_PASSTHROUGH_METADATA,
      handler,
    )
    if (bypass) {
      return next.handle()
    }

    if (!context.switchToHttp().getRequest()) {
      return next.handle()
    }

    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'undefined') {
          context.switchToHttp().getResponse().status(204)
          return data
        }
        return isArrayLike(data) ? { data } : data
      }),
    )
  }
}
