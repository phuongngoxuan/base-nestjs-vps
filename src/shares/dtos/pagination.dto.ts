import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    required: true,
    example: 'desc',
    description: '',
  })
  @Transform(({ value }) => String(value))
  @IsOptional()
  @IsIn(['desc', 'asc'])
  sort?: 'desc' | 'asc' = 'desc';

  @ApiPropertyOptional({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Max(100)
  @IsPositive()
  @IsOptional()
  limit?: number = 10;
}
