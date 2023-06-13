import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ProductStatus, ProductType } from 'src/shares/enums/product.enum';

export class CreateProductDto {
  @ApiProperty({ required: true, example: 'update name product' })
  @IsOptional()
  readonly name: string;

  @ApiProperty({ required: true, example: '817236218736s234j234ag234s234adf8123' })
  @IsOptional()
  readonly code: string;

  @ApiProperty({
    example: '',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  readonly category_id?: string;

  @ApiProperty({
    example: '647d8053e7a16483d3af5d5e',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  readonly supplier_id?: string;

  @ApiProperty({
    example: '123123123',
    required: false,
  })
  @IsOptional()
  readonly imei?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly iccid?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  readonly partner_id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly device_id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  readonly expense_start_date?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  readonly expiration_date?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  readonly image_id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly deposit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly activation_price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly service_opening_price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly equipment_price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly shipping_fee?: boolean;

  @ApiProperty({ required: false, enum: ProductType })
  @IsOptional()
  @IsEnum(ProductType)
  readonly type?: ProductType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly monthly_fee?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ required: true, enum: ProductStatus })
  @IsOptional()
  @IsEnum(ProductStatus)
  readonly status: ProductStatus;
}
