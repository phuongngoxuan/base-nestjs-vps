import { BullModule } from '@nestjs/bull';
import { CacheModule, Logger } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import { ConsoleModule } from 'nestjs-console';
import { masterMssqlConfig, mongodb } from 'src/configs/database.config';
import { redisConfig } from 'src/configs/redis.config';
import { HttpClientModule } from 'src/shares/http-clients/http.module';
import { KafkaModule } from 'src/shares/kafka-client/kafka-module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { DatabaseCommonModule } from './models/database-common';

const Modules = [
  Logger,
  TypeOrmModule.forRoot(masterMssqlConfig as ConnectionOptions), // connect mssql
  DatabaseCommonModule,
  MongooseModule.forRoot(mongodb.uri, mongodb.options), // connect mongo
  ScheduleModule.forRoot(),
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
  UsersModule,
];
export default Modules;
