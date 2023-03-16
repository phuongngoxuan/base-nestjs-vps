import { ApiProperty } from '@nestjs/swagger';
import { HistoriesEntity } from '../../models/entities/histories.entity';

export class UsersDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  history: HistoriesEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
