import { Repository } from 'typeorm';
import { CrawlEntity } from '../../../models/entities/crawler-status.entity';
import { UsersEntity } from '../../../models/entities/users.entity';
import { HistoriesEntity } from '../../../models/entities/histories.entity';
import { PoolsEntity } from 'src/models/entities/pools.entity';
import { TokensEntity } from 'src/models/entities/tokens.entity';
import { TokenPoolsEntity } from 'src/models/entities/token-pools.entity';
import { UserInfoEntity } from 'src/models/entities/user-info.entity';
import { UserPoolEntity } from '../../../models/entities/user-pools.entity';
import { UserPoolTokenEntity } from '../../../models/entities/user-pool-tokens.entity';
export class TransactionCrawlDto {
  transactionRepositoryCrawl: Repository<CrawlEntity>;
  transactionRepositoryUser: Repository<UsersEntity>;
  transactionRepositoryHistory: Repository<HistoriesEntity>;
  transactionRepositoryPool: Repository<PoolsEntity>;
  transactionRepositoryToken: Repository<TokensEntity>;
  transactionRepositoryTokenPool: Repository<TokenPoolsEntity>;
  transactionRepositoryUserInfo: Repository<UserInfoEntity>;
  transactionRepositoryUserPools: Repository<UserPoolEntity>;
  transactionRepositoryUserPoolTokens: Repository<UserPoolTokenEntity>;
}
