import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Users } from './entity/Users';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "danil",
    password: "danil",
    database: "site",
    synchronize: true,
    logging: false,
    entities: [Users],
    migrations: [],
    subscribers: [],
})
