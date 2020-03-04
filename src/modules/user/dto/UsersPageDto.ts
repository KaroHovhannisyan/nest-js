import { UserDto } from './UserDto';
import { ApiProperty } from '@nestjs/swagger';

export class UsersPageDto {
  @ApiProperty({
    type: UserDto,
    isArray: true,
  })
  readonly data: UserDto[];

  constructor(data: UserDto[]) {
    this.data = data;
  }
}
