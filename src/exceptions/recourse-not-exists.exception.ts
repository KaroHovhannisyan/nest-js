import { NotFoundException } from '@nestjs/common';

export class RecourseNotExistsException extends NotFoundException {
  constructor(resource?: string) {
    super(`${resource} not exists !`, resource);
  }
}
