import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/repositories/users.repository';
import { CrawlStatusRepository } from './repositories/crawler.repository';
import { HistoriesRepository } from './repositories/histories.repository';
import { MessageChatRepository } from './repositories/message-chats.repositoty';
import { PetsRepository } from './repositories/pets.repository';
import { ProceedPetExchangesRepository } from './repositories/proceed-pet-exchanges.repository';

const commonRepositories = [
  UserRepository,
  CrawlStatusRepository,
  HistoriesRepository,
  MessageChatRepository,
  PetsRepository,
  ProceedPetExchangesRepository,
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
