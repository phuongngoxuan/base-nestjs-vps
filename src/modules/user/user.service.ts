import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepositorySql } from 'src/models/repositories/users.repository';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { getConfig } from 'src/configs/index';
import { DatabaseSqlConfig } from 'src/configs/database.config';
import { UsersEntity } from 'src/models/entities/users.entity';
const { name } = getConfig().get<DatabaseSqlConfig>('master_mssql');

@Injectable()
export class UserService {
  logger = new Logger();
  constructor(
    @InjectRepository(UserRepositorySql, name) private usersRepositoryMaster: UserRepositorySql,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {
    this.logger.log(`MigrateUser`);
  }

  async getUsersSql(): Promise<UsersEntity[]> {
    const qb = this.usersRepositoryMaster.createQueryBuilder('tbl_Account');
    qb.where(`(tbl_Account.[RoleID] NOT LIKE '%4%' )`);
    return qb.getMany();
  }

  async getClientsSql(): Promise<UsersEntity[]> {
    const qb = this.usersRepositoryMaster.createQueryBuilder('tbl_Account');
    qb.where(`(tbl_Account.[RoleID] LIKE '%4%' )`);

    return qb.getMany();
  }

  async findUserByIdSql(id: number): Promise<UsersEntity> {
    const user = await this.usersRepositoryMaster.findOne({
      id,
    });
    return user;
  }

  async createUserMongo(users: User[]): Promise<void> {
    await this.userModel.create(users);
  }
  async createClientMongo(client: Client[]): Promise<void> {
    await this.clientModel.create(client);
  }
}
