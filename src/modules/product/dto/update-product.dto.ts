import {} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'price ID',
    example: '100000',
  })
  price?: number;

  @ApiPropertyOptional({
    description: 'price ID',
    example: 'quan bo',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'price ID',
    example: 'quan bo',
  })
  image_url?: string;

  @ApiPropertyOptional({
    description: 'price ID',
    example: 'dasy la quan bo cua anh quang anh ban voi gia rat re',
  })
  describe?: string;
}
