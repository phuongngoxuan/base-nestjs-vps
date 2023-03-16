import { ApiProperty } from '@nestjs/swagger';
import { historiesDto } from '../../../shares/dtos/history.dto';

export class metadata {
  @ApiProperty()
  total: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  lastPage: number;
}

export class ResHistoriesDto {
  @ApiProperty({
    type: historiesDto,
    isArray: true,
  })
  data: historiesDto[];

  @ApiProperty({ type: metadata })
  metadata: metadata;
}
