import { SetMetadata } from '@nestjs/common'
import { HTTP_REQ_TRANSFORM_PAGINATE } from '~/constants/meta.constant'
import {
  OMIT_RESPONSE_PROTECT_KEYS,
  RESPONSE_PASSTHROUGH_METADATA,
} from '~/constants/system.constant'

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

/**
 * @description 过滤响应体中的字段
 */
export const ProtectKeys: (keys: string[]) => MethodDecorator =
  (keys) => (target, key, descriptor: PropertyDescriptor) => {
    SetMetadata(OMIT_RESPONSE_PROTECT_KEYS, keys)(descriptor.value)
  }
