import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ChangeThemeDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  readonly themeId: string;
}
