import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
export const USER_MODEL = 'users';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DE_ACTIVE = 'DE_ACTIVE',
}

export enum UserRole {
  userRole0 = 0,
  userRole1 = 1,
  userRole2 = 2,
  userRole3 = 3,
  userRole5 = 5,
  userRole6 = 6,
  userRole7 = 7,
  userRole8 = 8,
  userRole9 = 9,
  userRole10 = 10,
}

@Schema({ timestamps: true, collection: USER_MODEL })
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  old_id: number;

  @Prop({ type: String, sparse: true })
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
  phone: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({ type: Boolean })
  gender: number;

  @Prop({ type: [{ type: Number, enum: UserRole }] })
  role: UserRole[];

  @Prop({ required: false, type: String })
  pancake: string;

  @Prop({ required: false, type: String })
  full_name_extra: string;

  @Prop({ required: false, type: String })
  pancake_extra: string;

  @Prop({ required: false, type: String })
  counselor_id: string; // todo convert

  @Prop({ required: false, type: Number })
  old_counselor_id: number;

  @Prop({ required: false, type: String })
  source_id: string; // todo convert

  @Prop({ required: false, type: Number })
  old_source_id: number;

  @Prop({ required: false, type: String })
  zip_code: string;

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

  @Prop({ required: false, type: String })
  old_part_hallo_id: string;

  @Prop({ type: Boolean, default: false })
  is_verify: boolean;

  @Prop({ type: Boolean, default: false })
  is_banned: boolean;

  @Prop({ required: false, type: Boolean })
  in_call: boolean;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.DE_ACTIVE })
  status: UserStatus; // todo change

  @Prop({ type: String })
  facebook_id: string;

  @Prop({ type: String })
  google_id: string;

  @Prop({ type: Date })
  last_login_at: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
