import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({
    required: true,
    example: 'su',
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsInt()
  age: number;

  @ApiProperty({
    required: true,
    example: 'Poodle',
  })
  @IsString()
  species: string;

  @ApiProperty({
    required: true,
    example: 'black',
  })
  @IsString()
  color: string;

  @ApiProperty({
    required: true,
    example: 'Standard',
  })
  @IsString()
  breed: string;

  @ApiProperty({
    required: true,
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    example: 'https://resq-bucket-2.s3.amazonaws.com/f14c79f9274fef8ddd97882699d348dd-2775373040069880089.jpg',
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    required: true,
    example: '3000000',
  })
  price: string;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsInt()
  shopId: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsInt()
  dadPetId: number;

  @ApiProperty({
    required: true,
    example: 2,
  })
  @IsInt()
  motherPetId: number;

  @ApiProperty({
    required: true,
    example: '{}',
  })
  listImage?: string = '{}';

  @ApiProperty({
    required: true,
    example: 'good',
  })
  health: string;
}
