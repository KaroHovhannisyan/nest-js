import { SetMetadata } from '@nestjs/common';

import { RoleType } from '../common/constants';

export const Roles = (...role: RoleType[]) => SetMetadata('roles', role);
