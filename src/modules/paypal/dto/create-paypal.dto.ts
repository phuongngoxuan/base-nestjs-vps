import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId, IsString } from 'class-validator';

export class CreatePaypalDto {
  @ApiProperty()
  @IsString()
  @IsMongoId()
  @IsDefined()
  itemId: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  returnUrl: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  cancelUrl: string;
}
