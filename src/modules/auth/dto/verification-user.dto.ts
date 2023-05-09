import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyUserDto {
  @ApiProperty({
    required: true,
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    required: true,
    example: 123456,
  })
  @IsNotEmpty()
  readonly code: number;
}
