import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Exclude } from 'class-transformer';
import { CLIENT_POLICY_MODEL } from './client-policy.schema';
import { PRODUCT_MODEL } from './product.schema';
export const CLIENT_MODEL = 'clients';

export enum ClientStatus {
  ACTIVE = 'ACTIVE',
  DE_ACTIVE = 'DE_ACTIVE',
  LOCKED = 'LOCKED',
}

export enum ClientRole {
  CLIENT = 1,
  CLIENT_ = 2,
}

@Schema({ _id: false })
export class ClientProduct {
  @Prop({ required: false, type: MongooseSchema.Types.ObjectId, index: true, ref: PRODUCT_MODEL })
  product_id: string;

  @Prop({ required: false, type: MongooseSchema.Types.Date })
  end_time: MongooseSchema.Types.Date;

  @Prop({ required: false, type: MongooseSchema.Types.Date })
  start_time: MongooseSchema.Types.Date;
}

export const ClientProductSchema = SchemaFactory.createForClass(ClientProduct);

@Schema({ timestamps: true, collection: CLIENT_MODEL })
export class Client {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, unique: true })
  old_id: number;

  @Prop({ type: String, unique: true, sparse: true })
  code: string;

  @Prop({ type: String, select: false })
  @Exclude()
  password: string;

  @Prop({ type: [String] })
  address: string[];

  @Prop({ type: String })
  full_name: string;

  @Prop({ type: String })
  japanese_name: string;

  @Prop({ type: String })
  phone_number: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({ type: Boolean })
  gender: boolean;

  // todo change
  @Prop({ type: String, enum: ClientRole, default: ClientRole.CLIENT })
  role: ClientRole;

  @Prop({ required: false, type: String })
  pancake: string;

  @Prop({ required: false, type: String })
  full_name_extra: string;

  @Prop({ required: false, type: String })
  pancake_extra: string;

  @Prop({ required: false, type: String })
  counselor_id: string; // todo convert

  @Prop({ required: false, type: String })
  source_id: string; // todo convert

  @Prop({ required: false, type: Number })
  zipCode: number;

  @Prop({ required: false, type: String })
  image_url: string;

  @Prop({ required: false, type: String })
  created_by: string;

  @Prop({ required: false, type: String })
  update_by: string;

  @Prop({ required: false, type: String })
  token_app: string;

  @Prop({ required: false, type: Date })
  token_deadline: Date;

  @Prop({ required: false, type: String })
  part_hallo_id: string; // todo convert

  @Prop({ type: Boolean, default: false })
  is_verify: boolean;

  @Prop({ type: Boolean, default: false })
  is_banned: boolean;

  @Prop({ required: false, type: [{ type: ClientProductSchema }] })
  client_products: ClientProduct[];

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId, index: true, ref: CLIENT_POLICY_MODEL })
  client_policy_id: string;

  @Prop({ required: false, type: Boolean })
  in_call: boolean;

  @Prop({ required: false, type: MongooseSchema.Types.Decimal128 })
  exp_point?: MongooseSchema.Types.Decimal128;

  @Prop({ required: false, type: MongooseSchema.Types.Decimal128 })
  token_points?: MongooseSchema.Types.Decimal128;

  @Prop({ required: false, type: MongooseSchema.Types.Decimal128 })
  reward_points?: MongooseSchema.Types.Decimal128;

  @Prop({ type: String, enum: ClientStatus, default: ClientStatus.DE_ACTIVE })
  status: ClientStatus;

  @Prop({ type: String })
  facebook_id: string;

  @Prop({ type: String })
  google_id: string;

  @Prop({ type: Date })
  last_login_at: Date;
}

export type ClientDocument = Client & Document;
export const ClientSchema = SchemaFactory.createForClass(Client);
