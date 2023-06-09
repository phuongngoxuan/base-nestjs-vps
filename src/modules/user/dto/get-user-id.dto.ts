import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdDto {
  @ApiProperty({
    description: 'User ID',
    example: '6440d750376fd29eb0a33c41',
  })
  @IsMongoId()
  id: string;
}
