import { Express } from 'express';

const authorizationRouter = require('./authRouter');
const booksRouter = require('./booksRouter');
const userRouter = require('./userRouter');

export default (app: Express) => {
  // app.use('/main', booksRouter);
  // app.use('/auth', authorizationRouter);
  // app.use('/user', userRouter);
};