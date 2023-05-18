import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { UserRole } from 'src/shares/enums/user.enum';
export const USER_MODEL='users';

@Schema({ timestamps: true, collection: USER_MODEL })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: String, unique: true, sparse: true })
  facebookId: string;

  @Prop({ type: String, unique: true, sparse: true })
  googleId: string;

  @Prop({ type: String })
  display_name: string;

  @Prop({ type: String })
  name: string;

  @Prop({
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({ type: String, default: '', select: false })
  @Exclude()
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: '' })
  image_url: string;

  @Prop({ type: Boolean, default: false })
  banned: boolean;

  @Prop({ type: Date })
  lastLoginAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
