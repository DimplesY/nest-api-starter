import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { SECURITY } from '~/app.config'
import { JwtStrategy } from './jwt.strategy'
import { PassportModule } from '@nestjs/passport'

export const __secret = SECURITY.jwtSecret

const jwtModule = JwtModule.registerAsync({
  useFactory() {
    return {
      secret: __secret,
      signOptions: {
        expiresIn: SECURITY.jwtExpire,
        algorithm: 'HS256',
      },
    }
  },
})

@Module({
  imports: [PassportModule, jwtModule],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, AuthService, jwtModule],
})
@Global()
export class AuthModule {}
