import { ApiProperty } from '@nestjs/swagger';
import { HistoriesEntity } from '../../models/entities/histories.entity';
import { UserPoolEntity } from '../../models/entities/user-pools.entity';

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

  // many to many custom user and pool
  @ApiProperty()
  userPool: UserPoolEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
