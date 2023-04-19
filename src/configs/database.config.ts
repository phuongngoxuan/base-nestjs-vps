import { getConfig } from 'src/configs/index';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import mongooseAggregatePaginateV2 from 'src/shares/libs/mongoose-aggregate-paginate-v2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addedPaginate = require('mongoose-aggregate-paginate-v2');

export interface DatabaseConfig {
  uri: string;
  options: MongooseModuleOptions;
}

export const masterConfig = {
  uri: getConfig().get<string>('mongodb.uri'),
  options: {
    directConnection: true,
    connectionFactory: (connection) => {
      connection.plugin(addedPaginate);
      connection.plugin(mongooseAggregatePaginateV2);
      return connection;
    },
  },
};

export const reportConfig = {
  uri: getConfig().get<string>('mongodb.uri'),
  options: {
    directConnection: true,
    connectionFactory: (connection) => {
      connection.plugin(addedPaginate);
      connection.plugin(mongooseAggregatePaginateV2);
      return connection;
    },
  },
};

export const mongodb = {
  uri: getConfig().get<string>('mongodb.uri'),
  options: {
    directConnection: true,
    connectionFactory: (connection) => {
      connection.plugin(addedPaginate);
      connection.plugin(mongooseAggregatePaginateV2);
      return connection;
    },
  },
};
