import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { Source, SourceDocument } from './schemas/source.schema';
import { Department, DepartmentDocument } from './schemas/department.schema';
import { getConfig } from 'src/configs/index';
const db_main_name = getConfig().get<string>('mongodb_main.name');

@Injectable()
export class UserMainService {
  constructor(
    @InjectModel(User.name, db_main_name) private userMainModel: Model<UserDocument>,
    @InjectModel(Client.name, db_main_name) private clientMainModel: Model<ClientDocument>,
    @InjectModel(Source.name, db_main_name) private sourceMainModel: Model<SourceDocument>,
    @InjectModel(Department.name, db_main_name) private departmentMainModel: Model<DepartmentDocument>,
  ) {}

  async createUser(users: User[]): Promise<void> {
    await this.userMainModel.create(users);
  }

  async createClient(clients: Client[]): Promise<void> {
    await this.clientMainModel.create(clients);
  }

  async createSource(sources: Source[]): Promise<void> {
    const sourcesInfo = await this.sourceMainModel.find();
    console.log(sourcesInfo);
    await this.sourceMainModel.create(sources);
  }

  async createDepartment(departments: Department[]): Promise<void> {
    await this.departmentMainModel.create(departments);
  }
}
