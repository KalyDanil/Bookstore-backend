import { AppDataSource } from './dataSource';
import { Books } from './entity/Books';
import { Users } from './entity/Users';

export const UsersRep = AppDataSource.getRepository(Users);
export const BooksRep = AppDataSource.getRepository(Books);