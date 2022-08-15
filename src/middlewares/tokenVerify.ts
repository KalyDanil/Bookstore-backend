import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../database/dataSource';
import createError from '../utils/errCreator';
import { jwtVerify } from '../utils/jwt';
import type { IReqUser } from '../types/req';

export const tokenVerify = async (req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw createError(
        StatusCodes.UNAUTHORIZED,
        'Log in.',
      );
    }

    const decoded = jwtVerify(token);
    const user = await dbReps.Users.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw createError(
        StatusCodes.NOT_FOUND,
        'User is not found',
      );
    }
    req.user = user;
    next();
  } catch (err) { next(err); }
};
