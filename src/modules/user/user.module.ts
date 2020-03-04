import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { AuthModule } from '../auth/auth.module';
import { UtilsService } from '../../providers/utils.service';
import { UserController } from './user.controller';
import { ValidatorService } from '../../shared/services/validator.service';
import { ConfigService } from '../../shared/services/config.service';
import { GeneratorService } from '../../shared/services/generator.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: './files',
    })
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UtilsService, ValidatorService, ConfigService, GeneratorService, ...userProviders],
})
export class UserModule {}
