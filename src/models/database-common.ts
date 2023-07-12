import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositorySql } from 'src/models/repositories/users.repository';
import { getConfig } from 'src/configs/index';
import { DatabaseSqlConfig } from 'src/configs/database.config';
import { PartHalloRepositorySql } from './repositories/part-hallo.repository';
import { SourceRepositorySql } from './repositories/source.repository';
const { name } = getConfig().get<DatabaseSqlConfig>('master_mssql');

const commonRepositories = [UserRepositorySql, PartHalloRepositorySql, SourceRepositorySql];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(commonRepositories, name)],
  exports: [TypeOrmModule],
})
export class DatabaseCommonModule {}
