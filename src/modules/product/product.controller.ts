import { Controller, Get, Post, Param, Patch, Query, Body, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GetProductDto } from './dto/get-products.dto';
import { Product } from './schemas/product.schema';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/shares/decorators/http.decorators';
import { UserRole } from 'src/shares/enums/user.enum';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all product and paging' })
  async findAll(@Query() query: GetProductDto): Promise<Product[]> {
    return this.productService.find(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post('')
  @Auth([UserRole.ADMIN])
  @ApiOperation({ summary: 'Admin create new product' })
  async create(@Body() createProductDto: CreateProductDto): Promise<void> {
    return this.productService.createProduct(createProductDto);
  }

  @Patch(':id')
  @Auth([UserRole.ADMIN])
  @ApiOperation({ summary: 'Admin Update product by id' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateProductDto): Promise<void> {
    await this.productService.findByIdAndUpDate(id, updateUserDto);
  }

  @Delete(':id')
  @Auth([UserRole.ADMIN])
  @ApiOperation({ summary: 'Admin delete product by id' })
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productService.deleteById(id);
  }
}
