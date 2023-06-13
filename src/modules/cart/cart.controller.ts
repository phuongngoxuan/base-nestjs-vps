import { Controller, Get, Post, Patch, Delete, Query, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { Auth } from 'src/shares/decorators/http.decorators';
import { GetCartDto } from './dto/get-cart.dto';
import { Cart } from './schemas/cart.schema';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiBearerAuth()
  @Auth()
  @ApiOperation({ summary: `Get all user's cart and paging` })
  async find(@UserID() userId: string, @Query() query: GetCartDto): Promise<Cart[]> {
    return this.cartService.find(query, userId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Auth()
  @ApiOperation({ summary: 'Get cart by id' })
  async findById(@UserID() userId: string, @Param('id') id: string): Promise<Cart> {
    return this.cartService.findById(id, userId);
  }

  @Post()
  @ApiBearerAuth()
  @Auth()
  @ApiOperation({ summary: 'Create new cart' })
  async create(@Body() createCartDto: CreateCartDto, @UserID() userId: string): Promise<void> {
    return this.cartService.createCart(createCartDto, userId);
  }

  //   @Patch(':id')
  //   @ApiBearerAuth()
  //   @Auth([UserRole.ADMIN])
  //   @ApiOperation({ summary: 'Admin Update product by id' })
  //   async update(@Param('id') id: string, @Body() updateUserDto: UpdateProductDto): Promise<void> {
  //     await this.cartService.findByIdAndUpDate(id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   @ApiBearerAuth()
  //   @Auth([UserRole.ADMIN])
  //   @ApiOperation({ summary: 'Admin delete product by id' })
  //   async deleteProduct(@Param('id') id: string): Promise<void> {
  //     await this.cartService.deleteById(id);
  //   }
}
