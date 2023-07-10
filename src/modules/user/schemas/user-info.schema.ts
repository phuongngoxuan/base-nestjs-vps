import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
export const USER_INFO_MODEL = 'user_info';

@Schema({ timestamps: true, collection: USER_INFO_MODEL })
export class UserInfo {
  @Prop({ type: String })
  name: string;

  @Prop({ required: false, type: String })
  condittion: string;

  @Prop({ required: false, type: String })
  upgrade_rewards: string;

  @Prop({ required: false, type: String })
  discount_policy: string;

  @Prop({ required: false, type: String })
  birthday_policy: string;

  @Prop({ required: false, type: String })
  return_exchange_policy: string;

  @Prop({ required: false, type: String })
  warranty_policy: string;

  @Prop({ required: false, type: String })
  maintenance_requirement: string;

  @Prop({ required: false, type: String })
  member_day_promotion: string;

  @Prop({ required: false, type: String })
  free_shipping_offer: string;

  @Prop({ required: false, type: String })
  extended_benefits: string;

  @Prop({ required: false, type: String })
  top_up_upgrade_rewards: string;

  @Prop({ required: false, type: SchemaTypes.Decimal128 })
  exp_point?: Types.Decimal128;

  @Prop({ required: false, type: SchemaTypes.Decimal128 })
  token_points?: Types.Decimal128;

  @Prop({ required: false, type: SchemaTypes.Decimal128 })
  reward_points?: Types.Decimal128;
}

export type UserInfoDocument = UserInfo & Document;
export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);
