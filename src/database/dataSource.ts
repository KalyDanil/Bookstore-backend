import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usery } from './entity/Usery';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "danil",
    password: "danil",
    database: "site",
    synchronize: true,
    logging: false,
    entities: [Usery],
    migrations: [],
    subscribers: [],
})
