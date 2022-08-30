import type { NextFunction, Response } from 'express';
import { ReasonPhrases } from 'http-status-codes';
import { dbReps } from '../database/dataSource';
import { createError } from '../utils/errCreator';
import { jwtVerify } from '../utils/jwt';
import type { IReqUser } from '../types/req';
import { errObjCreator } from '../utils/errObjCreator';

export const tokenVerify = async (req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw createError(
        ReasonPhrases.UNAUTHORIZED,
        [
          errObjCreator('headers', 'token', 'Log in'),
        ],
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
        ReasonPhrases.NOT_FOUND,
        [
          errObjCreator('headers', 'user', 'User is not found'),
        ],
      );
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.message === 'invalid signature') {
      next(createError(
        ReasonPhrases.BAD_REQUEST,
        [
          errObjCreator('headers', 'token', 'Token is not valid'),
        ],
      ));
    }
    if (err.message === 'jwt expired') {
      next(createError(
        ReasonPhrases.BAD_REQUEST,
        [
          errObjCreator('headers', 'token', 'Session expired'),
        ],
      ));
    }
    next(err);
  }
};
