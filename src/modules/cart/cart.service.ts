import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { httpErrors } from 'src/shares/exceptions';
import { GetCartDto } from './dto/get-cart.dto';
import { PRODUCTS_MODEL, Product, ProductDocument } from '../product/schemas/product.schema';
import { USER_MODEL } from '../user/schemas/user.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createCart(createCartDto: CreateCartDto, user_id: string): Promise<void> {
    const { product_id } = createCartDto;
    const product = await this.productModel.findById(product_id);

    if (!product) {
      throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
    }

    await this.cartModel.create({
      product_id,
      user_id,
    });
  }

  async find(getCartDto: GetCartDto, user_id: string): Promise<Cart[]> {
    const { sort, page, limit } = getCartDto;

    return this.cartModel
      .find({ user_id })
      .populate({
        path: 'user',
        model: USER_MODEL,
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: sort })
      .lean()
      .exec();
  }

  async findById(cart_id: string, user_id: string): Promise<Cart> {
    return this.cartModel.findOne({ _id: cart_id, user_id });
  }
}
