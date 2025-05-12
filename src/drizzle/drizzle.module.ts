import { Global, Module } from '@nestjs/common';
import { drizzleProvider, DrizzleService } from './database.provider';

@Global()
@Module({
  providers: [drizzleProvider],
  exports: [DrizzleService],
})
export class DrizzleModule {}
