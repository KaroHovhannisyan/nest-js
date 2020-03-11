import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configs/viveo-swagger';
import { setupValidation } from './configs/setup-validation';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  setupValidation(app);
  app.enableCors();
  const configService = app.select(SharedModule).get(ConfigService);
  const port = configService.getNumber('PORT');
  await app.listen(port);
  console.log(`App listen on port ${port}`);
}
bootstrap();
