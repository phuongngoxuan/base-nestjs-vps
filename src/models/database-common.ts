import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositorySql } from 'src/models/repositories/users.repository';

const commonRepositories = [UserRepositorySql];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(commonRepositories, 'master')],
  exports: [TypeOrmModule],
})
export class DatabaseCommonModule {}
