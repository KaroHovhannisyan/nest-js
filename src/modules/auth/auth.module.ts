import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '../../shared/services/config.service';
import { MailService } from '../../shared/services/mail-service';
import { UtilsService } from '../../providers/utils.service';
import { TokenService } from '../../shared/services/token.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: "supersecret",
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [...authProviders, ConfigService, JwtStrategy, MailService, UtilsService, TokenService],
})
export class AuthModule {}
