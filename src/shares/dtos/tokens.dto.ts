import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  token0Id: number;

  @ApiProperty()
  token1Id: number;

  @ApiProperty()
  chain: string;

  @ApiProperty()
  tokenName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  thumbLogo: string;

  @ApiProperty()
  usdPrice: string;

  @ApiProperty()
  largeLogo: string;

  @ApiProperty()
  existedOnCoingecko: boolean;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  symbolTokenLp: string;

  @ApiProperty()
  decimal: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
