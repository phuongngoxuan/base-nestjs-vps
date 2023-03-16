import { ApiProperty } from '@nestjs/swagger';

export class PoolDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  stakeTokens: string;

  @ApiProperty()
  rewardTokens: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  multiplier: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  endBlock: string;

  @ApiProperty()
  startBlock: string;

  @ApiProperty()
  apr: string;

  @ApiProperty()
  aprType: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  chain: string;

  @ApiProperty()
  stakingLimit: string;

  @ApiProperty()
  lockPeriod: string;

  @ApiProperty()
  rewardPerBlock: string;

  @ApiProperty()
  totalStake: string;

  @ApiProperty()
  totalClaim: string;

  @ApiProperty()
  startStake?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
