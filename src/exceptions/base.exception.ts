import { InternalServerErrorException } from '@nestjs/common';

export class BaseException extends InternalServerErrorException {
  constructor(message?: string | object | any) {
    if (message) {
      super(message);
    } else {
      super(`Something went wrong`);
    }
  }
}
