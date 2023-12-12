import { CacheModule as NestCacheModule } from '@nestjs/cache-manager'
import { Global, Module } from '@nestjs/common'

import { CacheService } from './cache.service'
import { RedisConfigService } from './redis.config.service'

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      useClass: RedisConfigService,
      inject: [RedisConfigService],
    }),
  ],
  providers: [RedisConfigService, CacheService],
  exports: [CacheService],
})
export class RedisModule {}
