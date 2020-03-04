import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  company: string;

  @ApiPropertyOptional()
  street: string;

  @ApiPropertyOptional()
  zip: string;

  @ApiPropertyOptional()
  country: string;

  @ApiPropertyOptional()
  phone: string;
}
