import express from 'express';
import type { Response, Request, NextFunction } from 'express';
import { AppDataSource } from '../database/dataSource';
import { Usery } from '../database/entity/Usery';

const authorizationRouter = express.Router();

const makeComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user1 = await AppDataSource.getRepository(Usery).findOneBy({
      id: 1,
  })

  
  user1.firstName = "Saw"
await AppDataSource.getRepository(Usery).save(user1)

  res.json(user1.firstName);
  } catch (err) { next(err); }
};
authorizationRouter.get('/book', makeComment);

export default authorizationRouter;
