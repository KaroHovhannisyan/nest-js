import { BadRequestException } from '@nestjs/common';
import { imageMimeTypes } from '../shared/services/validator.service';

export class FileNotImageException extends BadRequestException {
  constructor(message?: string | object | any, error?: string) {
    if (message) {
      super(message, error);
    } else {
      super(`Wrong file type, supported types - ${imageMimeTypes}`);
    }
  }
}
