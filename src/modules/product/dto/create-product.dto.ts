import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'price ID',
    example: '100000',
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'price ID',
    example: 'quan bo',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'price ID',
    example: 'quan bo',
  })
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({
    description: 'price ID',
    example: 'dasy la quan bo cua anh quang anh ban voi gia rat re',
  })
  @IsNotEmpty()
  describe: string;
}
