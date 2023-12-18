import { SetMetadata } from '@nestjs/common'
import {
  OMIT_RESPONSE_PROTECT_KEYS,
  RESPONSE_PASSTHROUGH_METADATA,
} from '~/constants/system.constant'
import { IdempotenceOption } from '../interceptors/idempotence.interceptor'
import { HTTP_IDEMPOTENCE_OPTIONS } from '~/constants/meta.constant'

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
 * 幂等
 */
export const Idempotence: (options?: IdempotenceOption) => MethodDecorator =
  (options) => (target, key, descriptor: PropertyDescriptor) => {
    SetMetadata(HTTP_IDEMPOTENCE_OPTIONS, options || {})(descriptor.value)
  }

/**
 * @description 过滤响应体中的字段
 */
export const ProtectKeys: (keys: string[]) => MethodDecorator =
  (keys) => (target, key, descriptor: PropertyDescriptor) => {
    SetMetadata(OMIT_RESPONSE_PROTECT_KEYS, keys)(descriptor.value)
  }
