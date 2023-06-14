import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async deleteById(_id: string, buyer_id: string): Promise<void> {
    await this.orderModel.findOneAndDelete({ _id, buyer_id });
  }
}
