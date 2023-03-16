import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class NewUserTestDto {
  @ApiProperty({
    required: true,
    example: '0x9d22c4c254674c748e338a0fd5a7c15c4dbde2b4',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @Transform(({ value }) => String(value))
  @IsNotEmpty()
  poolId: number;
}
