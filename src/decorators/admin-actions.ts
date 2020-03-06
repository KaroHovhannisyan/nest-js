import { createParamDecorator } from '@nestjs/common';

export const AdminActions = createParamDecorator((_data, request) => request.user);
