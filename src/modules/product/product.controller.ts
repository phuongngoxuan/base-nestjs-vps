import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProductService } from '../product/product.service';
import { GetUsersDto } from '../user/dto/get-users.dto';
import { GetProductDto } from './dto/get-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async findAll(@Query() productDto: GetUsersDto): Promise<any> {
    return this.productService.findAll(productDto);
  }

  @Get(':id')
  async findOne(@Param() getProductDto: GetProductDto): Promise<any> {
    return this.productService.findOne(getProductDto.id);
  }

  @Post()
  async create(@Body() product: CreateProductDto): Promise<any> {
    return this.productService.create(product);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  async update(@Param() getProductDto: GetProductDto, @Body() updateUserDto: UpdateProductDto): Promise<void> {
    await this.productService.update(getProductDto.id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'The product has been successfully deleted.' })
  async remove(@Param() getProductDto: GetProductDto): Promise<void> {
    return this.productService.delete(getProductDto.id);
  }
}
