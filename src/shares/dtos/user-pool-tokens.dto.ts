import { ApiProperty } from '@nestjs/swagger';

export class UserPoolTokenDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  index: number;

  @ApiProperty()
  userPoolId: number;

  @ApiProperty()
  rewardTokenId: number;

  @ApiProperty()
  stakeTokenId: number;

  @ApiProperty()
  totalStake: string;

  @ApiProperty()
  totalClaim: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
