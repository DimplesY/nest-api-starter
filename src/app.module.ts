import { Module } from '@nestjs/common';
import { LoggerModule } from '@/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
      },
    }),
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggerModule,
  ],
})
export class AppModule {}
