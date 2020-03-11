import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setupValidation(app: INestApplication) {
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
}
