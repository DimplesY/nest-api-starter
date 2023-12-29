import { CacheModule as NestCacheModule } from '@nestjs/cache-manager'
import { Global, Module } from '@nestjs/common'

import { CacheService } from './cache.service'
import { RedisConfigService } from './redis.config.service'
import { LockService } from './lock.service'

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      useClass: RedisConfigService,
      inject: [RedisConfigService],
    }),
  ],
  providers: [RedisConfigService, CacheService, LockService],
  exports: [CacheService, LockService],
})
export class RedisModule {}
