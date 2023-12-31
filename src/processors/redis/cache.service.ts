import { Cache } from 'cache-manager'
import type { Redis } from 'ioredis'

import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { API_CACHE_PREFIX } from '~/constants/cache.constant'
import { getRedisKey } from '~/shared/utils/redis.util'

// Cache 客户端管理器

// 获取器
export type TCacheKey = string
export type TCacheResult<T> = Promise<T | undefined>

/**
 * @class CacheService
 * @classdesc 承载缓存服务
 * @example CacheService.get(CacheKey).then()
 * @example CacheService.set(CacheKey).then()
 */
@Injectable()
export class CacheService {
  private cache!: Cache
  private logger = new Logger(CacheService.name)

  private ioRedis!: Redis
  constructor(@Inject(CACHE_MANAGER) cache: Cache) {
    this.cache = cache

    this.redisClient.on('ready', () => {
      this.logger.log('Redis is ready！')
    })
  }

  private get redisClient(): Redis {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.cache.store.client
  }

  public get<T>(key: TCacheKey): TCacheResult<T> {
    return this.cache.get(key)
  }

  public set(key: TCacheKey, value: any, milliseconds: number) {
    return this.cache.set(key, value, milliseconds)
  }

  public getClient() {
    return this.redisClient
  }

  public async cleanCatch() {
    const redis = this.getClient()
    const keys: string[] = await redis.keys(`${API_CACHE_PREFIX}*`)
    await Promise.all(keys.map((key) => redis.del(key)))

    return
  }

  public async cleanAllRedisKey() {
    const redis = this.getClient()
    const keys: string[] = await redis.keys(getRedisKey('*'))

    await Promise.all(keys.map((key) => redis.del(key)))

    return
  }
}
