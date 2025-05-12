import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { APP_PORT } from '@/app.config';
import { WinstonModule } from 'nest-winston';
import { logger } from '@/logger/logger.global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: logger }),
  });
  await app.listen(APP_PORT);
}

void bootstrap();
