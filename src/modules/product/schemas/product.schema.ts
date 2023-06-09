import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export const PRODUCTS_MODEL = 'products';

@Schema({ timestamps: true, collection: PRODUCTS_MODEL })
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;

  // todo relastion
  @Prop({ required: true })
  category_id: string;

  // todo relastion
  @Prop({ required: true })
  supplier_id: string;

  @Prop({ required: true })
  imei?: string;

  @Prop({ required: true })
  iccid?: string;

  // todo relastion
  @Prop({ required: true })
  partner_id?: string;

  // todo relastion
  @Prop({ required: true })
  device_id?: string;

  @Prop({ required: true })
  expense_start_date?: Date;

  @Prop({ required: true })
  expiration_date?: Date;

  // todo relastion
  @Prop({ required: true })
  image_url?: string;

  @Prop({ required: false, type: [SchemaTypes.Decimal128] })
  deposit?: Types.Decimal128[];

  @Prop({ required: false, type: [SchemaTypes.Decimal128] })
  activation_price?: Types.Decimal128[];

  @Prop({ required: false, type: [SchemaTypes.Decimal128] })
  price?: Types.Decimal128[];

  @Prop({ required: false, type: [SchemaTypes.Decimal128] })
  service_opening_price?: Types.Decimal128[];

  @Prop({ required: false, type: [SchemaTypes.Decimal128] })
  equipment_price?: Types.Decimal128[];

  @Prop()
  shipping_fee?: boolean;

  // todo
  @Prop()
  type?: string;

  @Prop({ required: false, type: [SchemaTypes.Decimal128] })
  monthly_fee?: Types.Decimal128[];

  @Prop()
  description?: string;
}

export type ProductsDocument = Products & Document;
export const ProductsSchema = SchemaFactory.createForClass(Products);
