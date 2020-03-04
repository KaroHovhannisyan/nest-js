import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(6)
  readonly newPassword: string;
}
