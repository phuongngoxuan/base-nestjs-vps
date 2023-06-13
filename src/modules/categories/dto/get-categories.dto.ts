import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { PaginationDto } from 'src/shares/dtos/pagination.dto';

export class GetCategoriesDto extends PaginationDto {}

export class GetCategoriesByIdDto {
  @ApiProperty({
    required: true,
    example: '647d8053e7a16483d3af5d5e',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
