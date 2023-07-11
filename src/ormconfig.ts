import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  type: 'mssql',
  host: process.env.MYSQL_HOST,
  port: 1433,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: 'AppHallo',
  entities: [__dirname + '/models/entities/**/*{.ts,.js}'],
  migrationsTableName: 'migrate_tables',
  synchronize: false,
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};

module.exports = config;
