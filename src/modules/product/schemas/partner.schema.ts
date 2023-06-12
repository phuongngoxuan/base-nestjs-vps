import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PartnerType } from 'src/shares/enums/product.enum';

export const PARTNER_MODEL = 'devices';

@Schema({ timestamps: true, collection: PARTNER_MODEL })
export class Partner {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: PartnerType })
  partner_type: PartnerType;

  @Prop({ required: false })
  desc: string;
}

export type PartnerDocument = Partner & Document;
export const PartnerSchema = SchemaFactory.createForClass(Partner);
