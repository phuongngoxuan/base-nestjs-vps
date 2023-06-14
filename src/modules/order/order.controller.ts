import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { Auth } from 'src/shares/decorators/http.decorators';
import { OrderService } from './order.service';
import { GetOrderDto } from './dto/get-orders.dto';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Order')
@Controller('order')
@Auth()
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: `Get all order of user and paging` })
  async find(@UserID() userId: string, @Query() query: GetOrderDto): Promise<Order[]> {
    // return this.orderService.find(query, userId);
    return [new Order()];
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get order by id' })
  async findById(@UserID() userId: string, @Param('id') id: string): Promise<Order> {
    // return this.orderService.findById(id, userId);
    return new Order();
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new order' })
  async create(@Body() createCartDto: CreateOrderDto, @UserID() userId: string): Promise<Order> {
    // return this.orderService.createCart(createCartDto, userId);
    return new Order();
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete order by id' })
  async deleteCart(@Param('id') id: string, @UserID() userId: string): Promise<void> {
    await this.orderService.deleteById(id, userId);
  }
}
