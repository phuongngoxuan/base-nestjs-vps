import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepositoryMongo {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async getUserMongo(): Promise<any> {
    const user = await this.userModel.find();
    console.log('__________________________user mongo_______________________');
    console.log(user);
    return user;
  }
}
