import { getConfig } from 'src/configs/index';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import mongooseAggregatePaginateV2 from 'src/shares/libs/mongoose-aggregate-paginate-v2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addedPaginate = require('mongoose-aggregate-paginate-v2');
import { SchemaOptions } from '@nestjs/mongoose';
import { formatDecimal } from 'src/shares/helpers/utils';

export interface DatabaseConfig {
  uri: string;
  options: MongooseModuleOptions;
}

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

export const Options: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (_, ret: any) {
      delete ret.id;
      delete ret.__v;
      return formatDecimal(ret);
    },
  },
  toObject: {
    virtuals: true,
    transform: function (_, ret: any) {
      delete ret.id;
      delete ret.__v;
      return formatDecimal(ret);
    },
  },
};
