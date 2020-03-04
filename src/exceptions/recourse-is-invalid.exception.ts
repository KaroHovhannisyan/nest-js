import { BadRequestException } from '@nestjs/common';

export class RecourseIsInvalidException extends BadRequestException {
  constructor(resource?: string) {
    super(`Invalid ${resource} !`, resource);
  }
}
