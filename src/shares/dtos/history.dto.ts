import { ApiProperty } from '@nestjs/swagger';
import { UsersDto } from './users.dto';

export class historiesDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  txHash: string;

  @ApiProperty()
  blockNumber: number;

  @ApiProperty()
  logIndex: number;

  @ApiProperty()
  action: string;

  @ApiProperty()
  blockTimestamp: number;

  @ApiProperty()
  poolId: number;

  @ApiProperty()
  data: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  user: UsersDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
