import { User } from '@model/modelSchema/user-schema'
import { ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export function getNestExecutionContextRequest(
  context: ExecutionContext,
): Request & { owner?: User } & Record<string, any> {
  return context.switchToHttp().getRequest<Request>()
}
