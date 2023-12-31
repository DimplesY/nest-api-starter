import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import {
  createExtendedPrismaClient,
  extendedPrismaClient,
} from './prisma.instance'
import { DATABASE } from '~/app.config'

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: extendedPrismaClient
  constructor() {
    this.client = createExtendedPrismaClient({
      url: DATABASE.url,
    })
  }
  async onModuleInit() {
    await this.client.$connect()
  }

  async onModuleDestroy() {
    await this.client.$disconnect()
  }

  public get prisma() {
    return this.client
  }
}
