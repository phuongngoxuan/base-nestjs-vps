import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { EmailService } from 'src/shares/helpers/mail.helpers';
import { Client, ClientSchema } from './schemas/client.schema';
import { Source, SourceSchema } from './schemas/source.schema';
import { Department, DepartmentSchema } from './schemas/department.schema';
import { getConfig } from 'src/configs/index';
const db_migrate_name = getConfig().get<string>('mongodb_migrate.name');

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], db_migrate_name),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }], db_migrate_name),
    MongooseModule.forFeature([{ name: Source.name, schema: SourceSchema }], db_migrate_name),
    MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }], db_migrate_name),
  ],
  providers: [UserService, EmailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
