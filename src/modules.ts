import { BullModule } from '@nestjs/bull';
import { CacheModule, Logger } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { ConsoleModule } from 'nestjs-console';
import { masterConfig, reportConfig } from 'src/configs/database.config';
import { redisConfig } from 'src/configs/redis.config';
import { DatabaseCommonModule } from 'src/models/database-common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { EventModule } from 'src/modules/events/event.module';
import { HelloKafka } from 'src/modules/hello-kafka/hello-kafka.module';
import { UsersModule } from 'src/modules/user/users.module';
import { HttpClientModule } from 'src/shares/http-clients/http.module';
import { KafkaModule } from 'src/shares/kafka-client/kafka-module';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { HistoryModule } from './modules/history/history.module';
import { Web3jsModule } from './modules/web3js/web3js.module';
import { EthersModule } from './modules/etherjs/ethers.module';
import { UploadModule } from './modules/upload/upload.module';
import { AwsModule } from './modules/aws/aws.module';

const Modules = [
  Logger,
  TypeOrmModule.forRoot(masterConfig),
  TypeOrmModule.forRoot(reportConfig),
  ScheduleModule.forRoot(),
  DatabaseCommonModule,
  KafkaModule,
  ConsoleModule,
  HttpClientModule,
  BullModule.forRoot({
    redis: redisConfig,
  }),
  CacheModule.register({
    store: redisStore,
    ...redisConfig,
    isGlobal: true,
  }),
  EventModule,
  AuthModule,
  UsersModule,
  HelloKafka,
  CrawlerModule,
  Web3jsModule,
  EthersModule,
  HistoryModule,
  AwsModule,
  UploadModule,
];
export default Modules;
