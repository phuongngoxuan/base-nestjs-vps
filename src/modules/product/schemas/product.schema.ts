import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductStatus, ProductType } from 'src/shares/enums/product.enum';
import { CATEGORIES_MODEL } from 'src/modules/categories/schemas/categories.schema';
import { SUPPLIER_MODEL } from './supplier.schema';
import { PARTNER_MODEL } from './partner.schema';
import { DEVICES_MODEL } from './devices.schema';
import { MEDIA_MODEL } from 'src/modules/media/schemas/media.schema';
export const PRODUCTS_MODEL = 'products';

@Schema({ timestamps: true, collection: PRODUCTS_MODEL })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, index: true, ref: CATEGORIES_MODEL })
  category_id: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, index: true, ref: SUPPLIER_MODEL })
  supplier_id: string;

  @Prop({ required: true })
  imei?: string;

  @Prop({ required: true })
  iccid?: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, index: true, ref: PARTNER_MODEL })
  partner_id: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, index: true, ref: DEVICES_MODEL })
  device_id?: string;

  @Prop({ required: true })
  expense_start_date?: Date;

  @Prop({ required: true })
  expiration_date?: Date;

  @Prop({
    required: false,
    type: SchemaTypes.ObjectId,
    index: true,
    ref: MEDIA_MODEL,
  })
  media_id?: string;

  @Prop({ required: false, type: SchemaTypes.Decimal128 })
  deposit?: Types.Decimal128;

  @Prop({ required: false, type: SchemaTypes.Decimal128 })
  activation_price?: Types.Decimal128;

  @Prop({ required: false, type: SchemaTypes.Decimal128 })
  price?: Types.Decimal128;

  @Prop({ required: false, type: SchemaTypes.Decimal128 })
  service_opening_price?: Types.Decimal128;

  @Prop({ required: false, type: SchemaTypes.Decimal128 })
  equipment_price?: Types.Decimal128;

  @Prop()
  shipping_fee?: boolean;

  @Prop({ type: String, enum: ProductType, default: ProductType.SIM })
  type: ProductType;

  @Prop({ required: false, type: SchemaTypes.Decimal128 })
  monthly_fee?: Types.Decimal128;

  @Prop()
  description?: string;

  @Prop({ type: String, enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
