import { Module } from '@nestjs/common';
import { UserMainController } from './user-main.controller';
import { UserMainService } from './user-main.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Client, ClientSchema } from './schemas/client.schema';
import { Source, SourceSchema } from './schemas/source.schema';
import { Department, DepartmentSchema } from './schemas/department.schema';
import { getConfig } from 'src/configs/index';
const db_main_name = getConfig().get<string>('mongodb_main.name');

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], db_main_name),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }], db_main_name),
    MongooseModule.forFeature([{ name: Source.name, schema: SourceSchema }], db_main_name),
    MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }], db_main_name),
  ],
  controllers: [UserMainController],
  providers: [UserMainService],
  exports: [UserMainService],
})
export class UserMainModule {}
