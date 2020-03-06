import { Module, Global, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService, ValidatorService } from './services';

const providers = [ConfigService, ValidatorService];

@Global()
@Module({
  providers,
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
        // if you want to use token with expiration date
        // signOptions: {
        //     expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}
