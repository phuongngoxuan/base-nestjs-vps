import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepositorySql } from 'src/models/repositories/users.repository';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepositorySql, 'master') private usersRepositoryMaster: UserRepositorySql,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getUser(): Promise<any> {
    const userSql = await this.usersRepositoryMaster.find();
    const userNosql = await this.userModel.find();

    console.log(userSql);
    console.log(userNosql);
  }
}
