import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const SUPPLIER_MODEL = 'supplier';

@Schema({ timestamps: true, collection: SUPPLIER_MODEL })
export class Supplier {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  address: string;
}

export type SupplierDocument = Supplier & Document;
export const SupplierSchema = SchemaFactory.createForClass(Supplier);
