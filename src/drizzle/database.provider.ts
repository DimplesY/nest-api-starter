import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { Pool } from 'pg';
import { logger } from '@/logger/logger.global';

export type DrizzleDB = ReturnType<typeof drizzle<typeof schema>>;

@Injectable()
export class DrizzleService {
  private readonly _db: DrizzleDB;
  constructor(private readonly config: ConfigService) {
    const url = this.config.get<string>('DATABASE_URL')!;
    const pool = new Pool({
      connectionString: url,
    });
    this._db = drizzle({
      client: pool,
      schema,
      logger: {
        logQuery(query, params) {
          logger.info(query, params);
        },
      },
    });
  }

  get db() {
    return this._db;
  }
}

export const drizzleProvider = {
  provide: DrizzleService,
  useClass: DrizzleService,
};
