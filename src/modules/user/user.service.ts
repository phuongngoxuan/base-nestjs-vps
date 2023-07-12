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
import { Source, SourceDocument } from './schemas/source.schema';
import { Department, DepartmentDocument } from './schemas/department.schema';
import { SourceRepositorySql } from 'src/models/repositories/source.repository';
import { PartHalloRepositorySql } from 'src/models/repositories/part-hallo.repository';
import { PartHalloEntity } from 'src/models/entities/part-hallo.entity';
import { SourceEntity } from 'src/models/entities/source.entity';
const { name } = getConfig().get<DatabaseSqlConfig>('master_mssql');

@Injectable()
export class UserService {
  logger = new Logger();
  constructor(
    @InjectRepository(UserRepositorySql, name) private usersRepositoryMaster: UserRepositorySql,
    @InjectRepository(SourceRepositorySql, name) private sourceRepositoryMaster: SourceRepositorySql,
    @InjectRepository(PartHalloRepositorySql, name) private partHalloRepositoryMaster: PartHalloRepositorySql,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectModel(Source.name) private sourceModel: Model<SourceDocument>,
    @InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>,
  ) {
    this.logger.log(`MigrateUser`);
  }

  // department
  async createDepartment(departments: Department[]): Promise<void> {
    await this.departmentModel.create(departments);
  }

  async findOneDepartmentMongo(condition): Promise<Department> {
    return this.departmentModel.findOne(condition);
  }

  async findDepartmentMongo(condition): Promise<Department[]> {
    return this.departmentModel.find(condition);
  }

  async findDepartmentSql(condition): Promise<PartHalloEntity[]> {
    return this.partHalloRepositoryMaster.find(condition);
  }

  // source
  async createSourceMongo(source: Source[]): Promise<void> {
    await this.sourceModel.create(source);
  }

  async findOneSourceMongo(condition): Promise<Source> {
    return this.sourceModel.findOne(condition);
  }

  async findSourceMongo(condition): Promise<Source[]> {
    return this.sourceModel.find(condition);
  }

  async findSourceSql(condition): Promise<SourceEntity[]> {
    return this.sourceRepositoryMaster.find(condition);
  }

  // user
  async getUsersSql(): Promise<UsersEntity[]> {
    const qb = this.usersRepositoryMaster.createQueryBuilder('tbl_Account');
    qb.where(`(tbl_Account.[RoleID] NOT LIKE '%4%' )`);
    return qb.getMany();
  }

  async findOneUserMongo(condition): Promise<User> {
    return this.userModel.findOne(condition);
  }

  async findUserByIdAndUpdateMongo(id: string, payload): Promise<void> {
    await this.userModel.findOneAndUpdate({ id }, payload);
  }

  async getUserMongo(): Promise<User[]> {
    return this.userModel.find();
  }

  //client
  async getClientsSql(): Promise<UsersEntity[]> {
    const qb = this.usersRepositoryMaster.createQueryBuilder('tbl_Account');
    qb.where(`(tbl_Account.[RoleID] LIKE '%4%' )`);

    return qb.getMany();
  }

  async findUserByIdSql(id: number): Promise<UsersEntity> {
    return this.usersRepositoryMaster.findOne({
      id,
    });
  }

  async findClientByIdAndUpdateMongo(id: string, payload): Promise<void> {
    await this.clientModel.findOneAndUpdate({ id }, payload);
  }

  async getClientMongo(): Promise<Client[]> {
    return this.clientModel.find();
  }

  async createUserMongo(users: User[]): Promise<void> {
    await this.userModel.create(users);
  }

  async createClientMongo(client: Client[]): Promise<void> {
    await this.clientModel.create(client);
  }
}
