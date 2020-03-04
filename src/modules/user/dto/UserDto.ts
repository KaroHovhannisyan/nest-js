'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { User } from '../../../models/User';

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  company: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional({ enum: RoleType })
  role: RoleType;

  @ApiPropertyOptional()
  password: string;

  constructor(user: User) {
    super(user);
    this.name = user.name;
    this.company = user.company;
    this.role = user.role;
    this.email = user.email;
    this.password = user.password;
  }
}
