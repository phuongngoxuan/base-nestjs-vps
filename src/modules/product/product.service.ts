import { Injectable, BadRequestException } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetProductDto } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { httpErrors } from 'src/shares/exceptions';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async find(payload: GetProductDto): Promise<Product[]> {
    const { sort, page, limit, category_id } = payload;
    const query: any = {};

    if (category_id) {
      query.category_id = category_id;
    }

    const product = await this.productModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: sort })
      .lean();

    return product;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
    }

    return this.productModel.findById(id);
  }

  async findByIdAndUpDate(id: string, payload: UpdateProductDto): Promise<void> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
    }
    await this.productModel.findOneAndUpdate({ _id: id }, payload);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    await this.productModel.create(createProductDto);
  }

  async deleteById(id: string): Promise<void> {
    await this.productModel.findOneAndDelete({ id });
  }
}
