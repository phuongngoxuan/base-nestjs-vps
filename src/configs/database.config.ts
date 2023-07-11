import { getConfig } from 'src/configs/index';
import { MongooseModuleOptions, SchemaOptions } from '@nestjs/mongoose';
import mongooseAggregatePaginateV2 from 'src/shares/libs/mongoose-aggregate-paginate-v2';
const addedPaginate = require('mongoose-aggregate-paginate-v2');
const { type, host, port, username, password, database, name } = getConfig().get<DatabaseSqlConfig>('master_mssql');
import { Types } from 'mongoose';
export interface DatabaseSqlConfig {
  type: 'mssql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  name: string;
}

export interface DatabaseConfig {
  uri: string;
  options: MongooseModuleOptions;
}

// MSSQL
export const masterMssqlConfig = {
  type,
  host,
  port: Number(port),
  username,
  password,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  stream: false,
  database,
  name,
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

// MONGODB
export const mongodb = {
  uri: getConfig().get<string>('mongodb.uri'),
  options: {
    autoCreate: false,
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

export const formatDecimal = (ret) => {
  if (ret instanceof Types.Decimal128) {
    return ret.toString();
  }
  if (Array.isArray(ret)) {
    ret.forEach((_, i) => (ret[i] = formatDecimal(ret[i])));
    return ret;
  }
  if (typeof ret === 'object') {
    try {
      for (const key of Object.keys(ret)) {
        ret[key] = formatDecimal(ret[key]);
      }
    } catch {}
    return ret;
  }
  return ret;
};
