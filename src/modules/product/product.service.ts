import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../../models/repositories/product.repository';
import { GetUsersDto } from '../user/dto/get-users.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository, 'report') private productRepositoryReport: ProductRepository,
    @InjectRepository(ProductRepository, 'master') private productRepositoryMaster: ProductRepository,
  ) {}

  async findAll(productDto: GetUsersDto): Promise<any> {
    return await this.productRepositoryReport.getProducts(productDto);
  }

  async findOne(id: number): Promise<any> {
    return this.productRepositoryReport.findOne(id);
  }

  async create(product: CreateProductDto): Promise<any> {
    return this.productRepositoryReport.save(product);
  }

  async update(id: number, product: UpdateProductDto): Promise<any> {
    const { name, image_url, describe, price } = product;
    const productData = await this.productRepositoryReport.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (price) productData.price = price;
    if (name) productData.name = name;
    if (image_url) productData.image_url = image_url;
    if (describe) productData.describe = describe;

    return this.productRepositoryMaster.update(id, productData);
  }

  async delete(id: number): Promise<void> {
    await this.productRepositoryMaster.delete(id);
  }
}
