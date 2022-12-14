import type { Express } from 'express';
import authorizationRouter from './authRouter';
import booksRouter from './booksRouter';
import userRouter from './userRouter';

export default (app: Express) => {
  app.use('/main', booksRouter);
  app.use('/auth', authorizationRouter);
  app.use('/users', userRouter);
};
