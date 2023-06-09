import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteCategoriesDto {
  @ApiProperty({
    required: true,
    example: '647d8053e7a16483d3af5d5e',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
