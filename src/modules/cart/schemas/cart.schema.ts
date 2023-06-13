import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { USER_MODEL } from 'src/modules/user/schemas/user.schema';
import { PRODUCTS_MODEL } from 'src/modules/product/schemas/product.schema';

export const CART_MODEL = 'carts';

@Schema({ timestamps: true, collection: CART_MODEL })
export class Cart {
  @Prop({ required: true, type: SchemaTypes.ObjectId, index: true ,ref:'users'})
  user_id: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, index: true, ref:'products' })
  product_id: string;
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.virtual('user', {
  ref: USER_MODEL,
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

CartSchema.virtual('product', {
  ref: PRODUCTS_MODEL,
  localField: '_id',
  foreignField: 'product_id',
  justOne: true,
});
