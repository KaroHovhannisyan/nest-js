import { BadRequestException } from '@nestjs/common';

export class ResourceIsInvalidException extends BadRequestException {
  constructor(resource?: string) {
    super(`Invalid ${resource} !`, resource);
  }
}
