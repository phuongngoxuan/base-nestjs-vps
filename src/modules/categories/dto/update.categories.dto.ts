import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Trim } from 'src/shares/decorators/transforms.decorator';

export class UpdateCategoriesDto {
  @ApiProperty({
    required: true,
    example: '647d8053e7a16483d3af5d5e',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({
    required: true,
    example: 'update new name category',
  })
  @Trim()
  name?: string;

  @ApiProperty({
    required: true,
    example: 'description mới',
  })
  @Trim()
  description?: string;
}
