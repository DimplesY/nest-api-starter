import { SetMetadata } from '@nestjs/common'
import { HTTP_REQ_TRANSFORM_PAGINATE } from '~/constants/meta.constant'
import { RESPONSE_PASSTHROUGH_METADATA } from '~/constants/system.constant'

/**
 * @description 分页转换
 */
export const Paginator: MethodDecorator = (
  target,
  key,
  descriptor: PropertyDescriptor,
) => {
  SetMetadata(HTTP_REQ_TRANSFORM_PAGINATE, true)(descriptor.value)
}

/**
 * @description 跳过响应体处理
 */
export const Bypass: MethodDecorator = (
  target,
  key,
  descriptor: PropertyDescriptor,
) => {
  SetMetadata(RESPONSE_PASSTHROUGH_METADATA, true)(descriptor.value)
}
