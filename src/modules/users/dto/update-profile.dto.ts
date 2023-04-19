import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ default: 'John Doe' })
  @IsString()
  @IsOptional()
  @MaxLength(30)
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  readonly email: string;
}
