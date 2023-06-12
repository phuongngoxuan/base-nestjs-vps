import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const DEVICES_MODEL = 'devices';

@Schema({ timestamps: true, collection: DEVICES_MODEL })
export class Devices {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: false })
  desc: string;
}

export type DevicesDocument = Devices & Document;
export const DevicesSchema = SchemaFactory.createForClass(Devices);
