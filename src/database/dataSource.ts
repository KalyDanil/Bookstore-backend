import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../config';
import { BookRatings } from './entity/BookRatings';
import { Books } from './entity/Books';
import { CartBooks } from './entity/CartBooks';
import { Comments } from './entity/Comments';
import { Genres } from './entity/Genres';
import { LikedBooks } from './entity/LikedBooks';
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
    Books,
    Genres,
    BookRatings,
    LikedBooks,
    CartBooks,
    Comments,
  ],
  migrations: [
    'src/database/migrations/**/*{.js,.ts}',
  ],
  subscribers: [
    'src/database/subscriber/**/*{.js,.ts}',
  ],
});

export const dbReps = {
  Users: AppDataSource.getRepository(Users),
  Books: AppDataSource.getRepository(Books),
  Genres: AppDataSource.getRepository(Genres),
  BookRatings: AppDataSource.getRepository(BookRatings),
  LikedBooks: AppDataSource.getRepository(LikedBooks),
  CartBooks: AppDataSource.getRepository(CartBooks),
  Comments: AppDataSource.getRepository(Comments),
};
