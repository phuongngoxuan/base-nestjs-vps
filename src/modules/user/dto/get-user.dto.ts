import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    description: 'User ID',
    example: '1',
  })
  @IsNumber()
  id: number;
}
