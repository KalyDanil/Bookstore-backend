import type { Express, NextFunction, Request, Response } from 'express';
import { validation } from '../middlewares/validation';
import authorizationRouter from './authRouter';

export default (app: Express) => {
  // app.use('/main', authorizationRouter);
  // app.use('/main', booksRouter);
  app.use(validation);
  app.use('/auth', authorizationRouter);
  // app.use('/user', userRouter);
};
