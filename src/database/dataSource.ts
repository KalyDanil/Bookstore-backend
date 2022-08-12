import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../config';
import { Users } from './entity/Users';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.dbPort,
  username: config.database.user,
  password: config.database.password,
  database: config.database.dbName,
  synchronize: false,
  logging: false,
  entities: [
    Users,
  ],
  migrations: [
    'src/database/migrations/**/*{.js,.ts}',
  ],
  subscribers: [
    'src/database/subscriber/**/*{.js,.ts}',
  ],
});
