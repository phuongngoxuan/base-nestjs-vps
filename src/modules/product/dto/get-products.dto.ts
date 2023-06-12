import { PaginationDto } from 'src/shares/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class GetProductDto extends PaginationDto {

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  readonly category_id?: string;
  
}
