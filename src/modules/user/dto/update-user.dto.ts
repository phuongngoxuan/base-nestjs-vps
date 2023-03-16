import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly lastName?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  readonly email?: string;
}
