import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export const CATEGORIES_MODEL = "categories";

@Schema({ timestamps: true, collection: CATEGORIES_MODEL })
export class Categories {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;
}


export type CategoriesDocument = Categories & Document;
export const CategoriesSchema = SchemaFactory.createForClass(Categories);

 