import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MediaType } from 'src/shares/enums/media.enum';

export const MEDIA_MODEL = 'media';

@Schema({ timestamps: true, collection: MEDIA_MODEL })
export class Media {
  @Prop({ required: true })
  file_name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  link?: string;

  @Prop({ required: false, enum: MediaType, default: MediaType.IMG })
  type?: MediaType;
}

export type MediaDocument = Media & Document;
export const MediaSchema = SchemaFactory.createForClass(Media);
