import { BadRequestException } from '@nestjs/common';

export class PermissionDeniedException extends BadRequestException {
  constructor(resource?: string) {
    super(`Permission Denied`, resource);
  }
}
