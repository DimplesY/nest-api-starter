import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { ZodValidationException } from 'nestjs-zod'

type myError = {
  readonly status: number
  readonly statusCode?: number

  readonly message?: string
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()

    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    if (request.method === 'OPTIONS') {
      return response.status(HttpStatus.OK).send()
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : (exception as myError)?.status ||
          (exception as myError)?.statusCode ||
          HttpStatus.INTERNAL_SERVER_ERROR

    const message =
      exception instanceof ZodValidationException
        ? exception.getZodError().errors.at(0)?.message
        : (exception as any)?.response?.message ||
          (exception as myError)?.message ||
          ''

    // const url = request.url

    const res = (exception as any).response
    response
      .status(status)
      .type('application/json')
      .send({
        ok: 0,
        code: res?.code || status,
        message:
          message || res?.message || (exception as any)?.message || '未知错误',
      })
  }
}
