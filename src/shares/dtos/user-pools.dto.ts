import { ApiProperty } from '@nestjs/swagger';

export class UserPoolsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  poolId: number;

  @ApiProperty()
  startStake: number;

  @ApiProperty()
  totalStake: string;

  @ApiProperty()
  totalClaim: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
