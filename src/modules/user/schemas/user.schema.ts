import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { UserRole, UserStatus } from 'src/shares/enums/user.enum';
import { CART_MODEL } from 'src/modules/cart/schemas/cart.schema';
export const USER_MODEL='users';

@Schema({ timestamps: true, collection: USER_MODEL })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  
  @Prop({ type: String })
  name: string;
  
  @Prop({ type: String, unique: true, sparse: true })
  code: string;

  @Prop({ type: String })
  Japanese_name: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  phone_number: string;

  @Prop({ type: String, default: '', select: false })
  @Exclude()
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.DE_ACTIVE })
  status: UserStatus;

  @Prop({ required: true, type: [String], index: true, default: [] })
  posts: string[];

  @Prop({ type: Boolean, default: false })
  is_verify: boolean;

  @Prop({ type: Boolean, default: false })
  lock: boolean;

  @Prop({ type: Boolean, default: false })
  banned: boolean;

  @Prop({ default: '' })
  image_url: string;

  @Prop({ required: true, type: [String], index: true, default: [] })
  products: string[];

  @Prop({ required: true, type: String, index: true, default: [] })
  user_info_id: string;

  @Prop({ type: Date })
  lastLoginAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);