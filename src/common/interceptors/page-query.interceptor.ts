import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common'
import { map, type Observable } from 'rxjs'

import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { HTTP_REQ_TRANSFORM_PAGINATE } from '~/constants/meta.constant'
import { transformDataToPaginate } from '~/transformers/paginate.transformer'
import { transformRequestToPageQuery } from '~/transformers/page-query.transformer'

@Injectable()
export class PageQueryInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const handler = context.getHandler()
    const classType = context.getClass()

    const paginator = this.reflector.getAllAndOverride<boolean>(
      HTTP_REQ_TRANSFORM_PAGINATE,
      [classType, handler],
    )

    if (!paginator) {
      return next.handle()
    }

    const request = context.switchToHttp().getRequest()

    // effect function to transform request
    const { page, size } = transformRequestToPageQuery(request.query)

    return next.handle().pipe(
      map(([list, total]) => {
        return transformDataToPaginate(list, total, page, size)
      }),
    )
  }
}
