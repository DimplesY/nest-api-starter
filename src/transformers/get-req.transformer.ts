import { ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export function getNestExecutionContextRequest(
  context: ExecutionContext,
): Request & { owner?: any } & Record<string, any> {
  return context.switchToHttp().getRequest<Request>()
}
