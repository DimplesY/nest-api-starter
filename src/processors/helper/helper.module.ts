import { Global, Module, Provider } from '@nestjs/common'
import { BcryptService } from './helper.bcrypt.service'

const providers: Provider<any>[] = [BcryptService]

@Global()
@Module({
  providers,
  exports: providers,
})
export class HelperModule {}
