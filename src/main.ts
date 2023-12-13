import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { showBanner } from './global/index.global'

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register(showBanner))
  await app.listen(3000)
}
bootstrap()
