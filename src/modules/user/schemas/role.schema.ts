import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export const ROLE_MODEL = 'role';

@Schema({ timestamps: true, collection: ROLE_MODEL })
export class Role {
  @Prop({ type: String })
  name: string;

  @Prop({ required: false, type: Boolean })
  is_hide: boolean;
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
