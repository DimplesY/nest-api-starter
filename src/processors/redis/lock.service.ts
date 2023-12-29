import { Injectable } from '@nestjs/common'
import RedLock from 'redlock'
import { CacheService } from './cache.service'

@Injectable()
export class LockService {
  private redlock: RedLock

  constructor(private readonly cache: CacheService) {
    this.redlock = new RedLock([this.cache.getClient()], {
      driftFactor: 0.01,
      retryCount: 10,
      retryDelay: 200,
      retryJitter: 200,
      automaticExtensionThreshold: 500,
    })
  }

  async acquireLock(resource: string, ttl = 1000) {
    return this.redlock.acquire([resource], ttl)
  }
}
