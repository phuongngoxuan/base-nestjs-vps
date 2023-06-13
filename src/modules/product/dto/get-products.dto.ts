import { PaginationDto } from 'src/shares/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { Trim } from 'src/shares/decorators/transforms.decorator';

export class GetProductDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  @Trim()
  readonly category_id?: string;
}
