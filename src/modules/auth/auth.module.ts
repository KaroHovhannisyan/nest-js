import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService, MailService, TokenService} from '../../shared/services';
import { UtilsService } from '../../providers/utils.service';
import { HandlebarsAdapter, MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: "rxPhglGJWPlOW596",
        signOptions: { expiresIn: '2h' }
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      transport: 'smtps://dev1@ayscan.de:dZzH4nBoL9EEW7NJ@sslout.df.eu',
      defaults: {
        from: 'dev1@ayscan.de',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...authProviders,
    ConfigService,
    JwtStrategy,
    MailService,
    UtilsService,
    TokenService,
  ],
})
export class AuthModule {}
