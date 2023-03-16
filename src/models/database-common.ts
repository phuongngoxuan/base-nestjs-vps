import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/repositories/users.repository';
import { CrawlStatusRepository } from './repositories/crawler.repository';
import { HistoriesRepository } from './repositories/histories.repository';
import { PoolRepository } from './repositories/pools.repository';
import { TokenPoolsRepository } from './repositories/token-pools.repository';
import { TokenRepository } from './repositories/tokens.repository';
import { UserPoolInfoRepository } from './repositories/user-pools.repository';

const commonRepositories = [
  UserRepository,
  CrawlStatusRepository,
  HistoriesRepository,
  PoolRepository,
  TokenPoolsRepository,
  TokenRepository,
  UserPoolInfoRepository,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature(commonRepositories, 'master'),
    TypeOrmModule.forFeature(commonRepositories, 'report'),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseCommonModule {}
