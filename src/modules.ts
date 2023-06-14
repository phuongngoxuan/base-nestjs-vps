import { BullModule } from '@nestjs/bull';
import { CacheModule, Logger } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import { ConsoleModule } from 'nestjs-console';
import { mongodb } from 'src/configs/database.config';
import { redisConfig } from 'src/configs/redis.config';
import { EventModule } from 'src/modules/events/event.module';
import { HelloKafka } from 'src/modules/hello-kafka/hello-kafka.module';
import { HttpClientModule } from 'src/shares/http-clients/http.module';
import { KafkaModule } from 'src/shares/kafka-client/kafka-module';
import { UploadModule } from './modules/upload/upload.module';
import { AwsModule } from './modules/aws/aws.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { MessageModule } from './modules/message/message.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { PromotionalModule } from './modules/promotional/promotional.module';

const Modules = [
  Logger,
  MongooseModule.forRoot(mongodb.uri, mongodb.options),
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
  EventModule,
  AuthModule,
  HelloKafka,
  AwsModule,
  UploadModule,
  UsersModule,
  MailModule,
  MessageModule,
  CategoriesModule,
  OrderModule,
  ProductModule,
  CartModule,
  PromotionalModule,
];
export default Modules;
