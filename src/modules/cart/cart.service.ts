import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { httpErrors } from 'src/shares/exceptions';
import { GetCartDto } from './dto/get-cart.dto';
import { Product, ProductDocument } from '../product/schemas/product.schema';
import { CartRepository } from './repositories/cart.repositories';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private cartRepository: CartRepository,
  ) {}

  async createCart(createCartDto: CreateCartDto, user_id: string): Promise<Cart> {
    const { product_id } = createCartDto;
    const product = await this.productModel.findById(product_id);
    const cart = await this.cartModel.findOne({ user_id, product_id });

    if (!product) {
      throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
    }

    if (!cart) {
      throw new BadRequestException(httpErrors.CART_EXISTED);
    }

    return this.cartModel.create({
      product_id,
      user_id,
    });
  }

  async find(getCartDto: GetCartDto, user_id: string): Promise<Cart[]> {
    return this.cartRepository.find(getCartDto, user_id);
  }

  async findById(cart_id: string, user_id: string): Promise<Cart> {
    return this.cartRepository.findByUserId(cart_id, user_id);
  }

  async deleteById(_id: string, user_id: string): Promise<void> {
    await this.cartModel.deleteOne({ _id, user_id });
  }
}
