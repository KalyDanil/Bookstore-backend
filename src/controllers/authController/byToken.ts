import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { IReqUser } from '../../types/req';

export const authorizationByToken = async (req: IReqUser, res: Response, next: NextFunction) => {
  try {
    return res.status(StatusCodes.OK).json(req.user);
  } catch (err) { next(err); }
};
