import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Transform } from 'class-transformer';
export const CONVERSATIONS_MODEL = 'conversations';

@Schema({ timestamps: true, collection: CONVERSATIONS_MODEL })
export class Conversation {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: false, type: [SchemaTypes.ObjectId] })
  members?: string[];
}

export type ConversationDocument = Conversation & Document;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);