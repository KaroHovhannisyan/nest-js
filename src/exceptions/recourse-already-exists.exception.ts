import { BadRequestException } from '@nestjs/common';

export class RecourseAlreadyExistsException extends BadRequestException {
  constructor(resource?: string) {
    super(`${resource} already exists!`, resource);
  }
}
