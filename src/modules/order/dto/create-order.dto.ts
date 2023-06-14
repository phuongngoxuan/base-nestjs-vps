import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types, Schema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { OrderPaymentMethod, OrderStatus, OrderType, OrderWifiTemporarily } from 'src/shares/enums/order.enum';

export class Timestamps {
  @ApiProperty({ required: false })
  start_time: number;
  @ApiProperty({ required: false })
  end_time: number;
}

export class Date {
  @ApiProperty({ required: false })
  start_date?: number;

  @ApiProperty({ required: false })
  end_date?: number;
}

export class PhoneTime {
  @ApiProperty({ required: false, type: Schema.Types.Date })
  end_time: Schema.Types.Date;

  @ApiProperty({ required: false, type: Schema.Types.Date })
  start_time: Schema.Types.Date;
}

export class CreateOrderDto {
  @ApiProperty({ required: false })
  @IsMongoId()
  user_id: string;

  @ApiProperty({ required: true })
  @IsMongoId()
  buyer_id: string;

  @ApiProperty({ required: true })
  @IsArray()
  @ArrayMinSize(0)
  products: Types.ObjectId[];

  @ApiProperty({ required: false })
  @IsArray()
  @ArrayMinSize(0)
  @IsOptional()
  promotionals: Types.ObjectId[];

  @ApiProperty({ required: false, enum: OrderType })
  @IsOptional()
  @IsEnum(OrderType)
  type: OrderType;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  link_pancake?: string;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  name_pancake?: string;

  @ApiProperty({ required: false, enum: OrderPaymentMethod })
  @IsOptional()
  @IsEnum(OrderPaymentMethod)
  payment_methods: OrderPaymentMethod;

  @ApiProperty({
    required: false,
    type: Timestamps,
  })
  @IsOptional()
  delivery_time: Timestamps;

  @ApiProperty({
    required: false,
    type: Date,
  })
  delivery_date: Date;

  @ApiProperty({ required: false })
  @IsMongoId()
  shipping_id: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  describe: string;

  @ApiProperty({ required: false, type: Types.Decimal128 })
  total_amount: Types.Decimal128;

  @ApiProperty({ required: true, type: String })
  @IsString()
  zip_code: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  address: string;

  @ApiProperty({ required: false, type: Schema.Types.Date })
  @IsOptional()
  @IsDate()
  shipping_at?: Schema.Types.Date;

  @ApiProperty({ required: false, type: Schema.Types.Date })
  @IsOptional()
  @IsDate()
  receive_at?: Schema.Types.Date;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  counselor_note?: string;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  carrier_note?: string;

  @ApiProperty({ required: false, type: Boolean })
  @IsBoolean()
  is_hikari?: boolean;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  origin?: string;

  @ApiProperty({ required: false, type: PhoneTime })
  @IsOptional()
  phone_time?: PhoneTime;

  @ApiProperty({ required: false, type: Schema.Types.Date })
  @IsOptional()
  installation_date?: Schema.Types.Date;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  tp_link_info?: string;

  @ApiProperty({ required: false, enum: OrderWifiTemporarily })
  @IsOptional()
  @IsEnum(OrderWifiTemporarily)
  wifi_temporarily?: OrderWifiTemporarily;

  @ApiProperty({ required: false, type: Schema.Types.Date })
  @IsOptional()
  @IsDate()
  receive_wifi_temporarily_at?: Schema.Types.Date;

  @ApiProperty({ required: false, type: Schema.Types.Decimal128 })
  @IsOptional()
  @IsNumber()
  saihakko_fee?: Schema.Types.Decimal128;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  payment_appointment?: string;

  @ApiProperty({ required: false, type: Schema.Types.Date })
  @IsOptional()
  @IsDate()
  saihakko_day?: Schema.Types.Date;

  @ApiProperty({ required: false, type: Schema.Types.Decimal128 })
  @IsOptional()
  @IsNumber()
  surcharge?: Schema.Types.Decimal128;

  @ApiProperty({ required: false, enum: OrderStatus })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
