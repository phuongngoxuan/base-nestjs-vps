import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Exclude } from 'class-transformer';
// import { PRODUCT_MODEL } from 'src/modules/product/schemas/product.schema';
// import { CLIENT_POLICY_MODEL } from './client-policy.schema';
// import { ClientRole, ClientStatus } from 'src/shares/enums/client.enum';
export const CLIENT_MODEL = 'clients';

@Schema({ _id: false })
export class ClientProduct {
  //   @Prop({ required: false, type: MongooseSchema.Types.ObjectId, index: true, ref: PRODUCT_MODEL })
  //   product_id: string;
  //   @Prop({ required: false, type: MongooseSchema.Types.Date })
  //   end_time: MongooseSchema.Types.Date;
  //   @Prop({ required: false, type: MongooseSchema.Types.Date })
  //   start_time: MongooseSchema.Types.Date;
}

export const ClientProductSchema = SchemaFactory.createForClass(ClientProduct);

@Schema({ timestamps: true, collection: CLIENT_MODEL })
export class Client {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, unique: true, sparse: true })
  code: string;

  @Prop({ type: String })
  Japanese_name: string;

  @Prop({ type: [String] })
  address: string[];

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  phone_number: string;

  @Prop({ type: String, select: false })
  @Exclude()
  password: string;

  @Prop({ type: Boolean, default: false })
  is_verify: boolean;

  @Prop({ type: Boolean, default: false })
  is_banned: boolean;

  @Prop({ required: false, type: String })
  image_url: string;

  @Prop({ required: false, type: [{ type: ClientProductSchema }] })
  client_products: ClientProduct[];

  //   @Prop({ required: false, type: MongooseSchema.Types.ObjectId, index: true, ref: CLIENT_POLICY_MODEL })
  //   client_policy_id: string;

  @Prop({ required: false, type: MongooseSchema.Types.Decimal128 })
  exp_point?: MongooseSchema.Types.Decimal128;

  @Prop({ required: false, type: MongooseSchema.Types.Decimal128 })
  token_points?: MongooseSchema.Types.Decimal128;

  @Prop({ required: false, type: MongooseSchema.Types.Decimal128 })
  reward_points?: MongooseSchema.Types.Decimal128;

  //   @Prop({ type: String, enum: ClientStatus, default: ClientStatus.DE_ACTIVE })
  //   status: ClientStatus;

  //   @Prop({ type: String, enum: ClientRole, default: ClientRole.CLIENT })
  //   role: ClientRole;

  @Prop({ type: String })
  facebook_id: string;

  @Prop({ type: String })
  google_id: string;

  @Prop({ type: Date })
  last_login_at: Date;
}

export type ClientDocument = Client & Document;
export const ClientSchema = SchemaFactory.createForClass(Client);
