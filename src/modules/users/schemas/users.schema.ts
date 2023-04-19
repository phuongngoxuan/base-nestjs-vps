import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { UserRole } from 'src/shares/enums/user.enum';

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: String, unique: true, sparse: true })
  facebookId: string;

  @Prop({ type: String, unique: true, sparse: true })
  instagramId: string;

  @Prop({ type: String, required: true })
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
  avatar: string;

  @Prop({ type: Boolean, default: false })
  banned: boolean;

  @Prop({ type: Date })
  lastLoginAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
