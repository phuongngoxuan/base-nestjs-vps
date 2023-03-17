import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetProductDto {
  @ApiProperty({
    description: 'product ID',
    example: '1',
  })
  @IsNumber()
  id: number;
}
