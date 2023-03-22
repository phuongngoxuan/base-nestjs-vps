import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';
export class UpdatePetDto {
  @ApiPropertyOptional({
    example: 'su',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional({
    example: 'Poodle',
  })
  @IsOptional()
  @IsString()
  species?: string;

  @ApiPropertyOptional({
    example: 'Standard',
  })
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiPropertyOptional({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://resq-bucket-2.s3.amazonaws.com/f14c79f9274fef8ddd97882699d348dd-2775373040069880089.jpg',
  })
  @IsOptional()
  @IsUrl()
  image_url?: string;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  pet_owner_id?: number;

  @ApiPropertyOptional({
    example: 3000000,
  })
  @IsOptional()
  @IsNumber()
  price?: string;
}
