import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, SchemaTypes } from 'mongoose';
import { PromotionalStatus } from 'src/shares/enums/promotional.enum';
export const PROMOTIONAL_MODEL = 'promotional';

@Schema({ timestamps: true, collection: PROMOTIONAL_MODEL })
export class Promotional {
  @Prop({ required: false, type: Number, default: 0 })
  amount: number;

  @Prop({ required: true, type: String })
  code: string;

  @Prop({ required: false, type: SchemaTypes.Decimal128, default: 0 })
  percent_discount: MongooseSchema.Types.Decimal128;

  @Prop({ required: false, type: String })
  gift: string;

  @Prop({ type: String, enum: PromotionalStatus, default: PromotionalStatus.ACTIVE })
  status: PromotionalStatus;
}

export type PromotionalDocument = Promotional & Document;
export const PromotionalSchema = SchemaFactory.createForClass(Promotional);
