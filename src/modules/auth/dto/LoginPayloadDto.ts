'use strict';

import { TokenPayloadDto } from './TokenPayloadDto';
import { UserDto } from '../../user/dto/UserDto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../models/User';

export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  user: User;
  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: User, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
