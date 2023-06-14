import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PRODUCTS_MODEL } from 'src/modules/product/schemas/product.schema';
import { PROMOTIONAL_MODEL } from 'src/modules/promotional/schemas/promotional.schema';
import { USER_MODEL } from 'src/modules/user/schemas/user.schema';
import { OrderPaymentMethod, OrderStatus, OrderType, OrderWifiTemporarily } from 'src/shares/enums/order.enum';
export const ORDER_MODEL = 'orders';

export class Timestamps {
  @Prop({ required: false, type: Number })
  start_time?: number;

  @Prop({ required: false, type: Number })
  end_time?: number;
}

export class Date {
  @Prop({ required: false, type: Number })
  start_date?: number;

  @Prop({ required: false, type: Number })
  end_date?: number;
}

export class PhoneTime {
  @Prop({ required: false, type: MongooseSchema.Types.Date })
  end_time: MongooseSchema.Types.Date;

  @Prop({ required: false, type: MongooseSchema.Types.Date })
  start_time: MongooseSchema.Types.Date;
}

@Schema({ timestamps: true, collection: ORDER_MODEL })
export class Order {
  @Prop({ required: false, type: MongooseSchema.Types.ObjectId, index: true, ref: USER_MODEL })
  user_id: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, index: true, ref: USER_MODEL })
  buyer_id: string;

  @Prop({ required: true, type: [{ type: MongooseSchema.Types.ObjectId, ref: PRODUCTS_MODEL, index: true }] })
  products: MongooseSchema.Types.ObjectId[];

  @Prop({ required: false, type: [{ type: MongooseSchema.Types.ObjectId, ref: PROMOTIONAL_MODEL, index: true }] })
  promotionals?: MongooseSchema.Types.ObjectId[];

  @Prop({ type: String, enum: OrderType, default: OrderType.EXTEND })
  type: OrderType;

  @Prop({ required: false, type: String })
  link_pancake?: string;

  @Prop({ required: false, type: String })
  name_pancake?: string;

  @Prop({ required: true, type: String, enum: OrderPaymentMethod, default: OrderPaymentMethod.DIRECT })
  payment_methods: OrderPaymentMethod;

  @Prop({ required: false, type: Timestamps })
  delivery_time?: Timestamps;

  @Prop({ required: false, type: Date })
  delivery_date?: Date;

  // todo shipping pending
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, index: true })
  shipping_id: string;

  @Prop({ required: false, type: String })
  describe?: string;

  @Prop({ required: true, type: MongooseSchema.Types.Decimal128, default: 0 })
  total_amount: MongooseSchema.Types.Decimal128;

  @Prop({ required: false, type: String })
  zip_code?: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: false, type: MongooseSchema.Types.Date })
  shipping_at?: MongooseSchema.Types.Date;

  @Prop({ required: false, type: MongooseSchema.Types.Date })
  receive_at?: MongooseSchema.Types.Date;

  @Prop({ required: false, type: String })
  counselor_note?: string;

  @Prop({ required: false, type: String })
  carrier_note?: string;

  @Prop({ required: false, type: Boolean })
  is_hikari?: boolean;

  @Prop({ required: false, type: String })
  language?: string;

  @Prop({ required: false, type: String })
  origin?: string;

  @Prop({ required: false, type: PhoneTime })
  phone_time?: PhoneTime;

  @Prop({ required: false, type: MongooseSchema.Types.Date })
  installation_date?: MongooseSchema.Types.Date;

  @Prop({ required: false, type: String })
  tp_link_info?: string;

  @Prop({ required: false, enum: OrderWifiTemporarily })
  wifi_temporarily?: OrderWifiTemporarily;

  @Prop({ required: false, type: MongooseSchema.Types.Date })
  receive_wifi_temporarily_at?: MongooseSchema.Types.Date;

  @Prop({ required: false, type: MongooseSchema.Types.Decimal128 })
  saihakko_fee?: MongooseSchema.Types.Decimal128;

  @Prop({ required: false, type: String })
  payment_appointment?: string;

  @Prop({ required: false, type: MongooseSchema.Types.Date })
  saihakko_day?: MongooseSchema.Types.Date;

  @Prop({ required: false, type: MongooseSchema.Types.Decimal128 })
  surcharge?: MongooseSchema.Types.Decimal128;

  @Prop({ required: false, enum: OrderStatus })
  status?: OrderStatus;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
