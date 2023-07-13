import { BullModule } from '@nestjs/bull';
import { CacheModule, Logger } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import { ConsoleModule } from 'nestjs-console';
import { masterMssqlConfig, mongodb_migrate, mongodb_main } from 'src/configs/database.config';
import { redisConfig } from 'src/configs/redis.config';
import { HttpClientModule } from 'src/shares/http-clients/http.module';
import { KafkaModule } from 'src/shares/kafka-client/kafka-module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { DatabaseCommonModule } from './models/database-common';
import { MigrateModule } from './modules/migrate/migrate.module';
import { UserMainModule } from './modules/user-main/user-main.module';

const Modules = [
  Logger,
  TypeOrmModule.forRoot(masterMssqlConfig as ConnectionOptions), // connect mssql
  DatabaseCommonModule,
  MongooseModule.forRoot(mongodb_migrate.uri, mongodb_migrate.options), // connect mongo migrate
  MongooseModule.forRoot(mongodb_main.uri, mongodb_main.options), // connect mongo main
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
  MigrateModule,
  ConsoleModule,
  UserMainModule,
];
export default Modules;
