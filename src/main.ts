import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configs/viveo-swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
// @ts-ignore
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: {
        target: true,
      },
    }),
  );
  app.enableCors();
  app.useStaticAssets({
    root: join(__dirname, '..', 'uploads'),
    prefix: '/uploads/',
  });
  await app.listen(3000);
  console.log(`App listen on port 3000`);
}
bootstrap();
