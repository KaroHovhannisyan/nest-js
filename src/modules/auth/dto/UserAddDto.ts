import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '../../../common/constants';
import { ENUM } from 'sequelize';
import { Optional } from '@nestjs/common';

export class UserAddDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Optional()
  readonly company: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  readonly password: string;

  @IsString() // todo
  @ApiProperty({ enum: RoleType })
  readonly role: string;

  @IsString() // todo
  @Optional()
  @ApiProperty()
  readonly zip: string;

  @IsString() // todo
  @ApiProperty()
  @Optional()
  readonly street: string;

  @IsString() // todo
  @ApiProperty()
  @Optional()
  readonly country: string;

  @IsString() // todo
  @ApiProperty()
  @Optional()
  readonly phone: string;
}
