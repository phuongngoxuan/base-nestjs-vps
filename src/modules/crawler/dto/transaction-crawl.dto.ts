import { Repository } from 'typeorm';
import { CrawlEntity } from '../../../models/entities/crawler-status.entity';
import { UsersEntity } from '../../../models/entities/users.entity';
import { HistoriesEntity } from '../../../models/entities/histories.entity';
import { UserInfoEntity } from 'src/models/entities/user-info.entity';

export class TransactionCrawlDto {
  transactionRepositoryCrawl: Repository<CrawlEntity>;
  transactionRepositoryUser: Repository<UsersEntity>;
  transactionRepositoryHistory: Repository<HistoriesEntity>;
  transactionRepositoryUserInfo: Repository<UserInfoEntity>;
}
