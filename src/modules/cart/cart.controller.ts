import { Controller, Get, Post, Query, Body, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { Auth } from 'src/shares/decorators/http.decorators';
import { GetCartDto } from './dto/get-cart.dto';
import { Cart } from './schemas/cart.schema';

@ApiTags('Cart')
@Controller('cart')
@Auth()
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: `Get all user's cart and paging` })
  async find(@UserID() userId: string, @Query() query: GetCartDto): Promise<Cart[]> {
    return this.cartService.find(query, userId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get cart by id' })
  async findById(@UserID() userId: string, @Param('id') id: string): Promise<Cart> {
    return this.cartService.findById(id, userId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new cart' })
  async create(@Body() createCartDto: CreateCartDto, @UserID() userId: string): Promise<Cart> {
    return this.cartService.createCart(createCartDto, userId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete cart by id' })
  async deleteCart(@Param('id') id: string, @UserID() userId: string): Promise<void> {
    await this.cartService.deleteById(id, userId);
  }
}
