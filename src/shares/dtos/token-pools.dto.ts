import { ApiProperty } from '@nestjs/swagger';

export class TokenPoolsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  poolId: number;

  @ApiProperty()
  index: number;

  @ApiProperty()
  rate: string;

  @ApiProperty()
  stakeTokenId: number;

  @ApiProperty()
  rewardTokenId: number;

  @ApiProperty()
  totalStake: string;

  @ApiProperty()
  apr: string;

  @ApiProperty()
  totalClaim: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
