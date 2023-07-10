import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Exclude } from 'class-transformer';
import { UserRole, UserStatus } from 'src/shares/enums/user.enum';
import { USER_INFO_MODEL } from './user-info.schema';
export const USER_MODEL = 'users';

@Schema({ timestamps: true, collection: USER_MODEL })
export class User {
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

  //todo: ref module post pending
  @Prop({ required: true, type: [String], index: true, default: [] })
  posts: string[];

  @Prop({ type: Boolean, default: false })
  is_verify: boolean;

  @Prop({ type: Boolean, default: false })
  lock: boolean;

  @Prop({ type: Boolean, default: false })
  banned: boolean;

  //todo: ref module media pending
  @Prop({ required: false, type: MongooseSchema.Types.ObjectId, index: true })
  image_id: string;

  @Prop({ type: [String], index: true, default: [] })
  products: string[];

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId, index: true, ref: USER_INFO_MODEL })
  user_info_id: string;

  @Prop({ type: Date })
  lastLoginAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
