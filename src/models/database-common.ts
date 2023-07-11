import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositorySql } from 'src/models/repositories/users.repository';
import { getConfig } from 'src/configs/index';
import { DatabaseSqlConfig } from 'src/configs/database.config';
const { name } = getConfig().get<DatabaseSqlConfig>('master_mssql');

const commonRepositories = [UserRepositorySql];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(commonRepositories, name)],
  exports: [TypeOrmModule],
})
export class DatabaseCommonModule {}
