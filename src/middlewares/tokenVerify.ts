import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsersRep } from '../database/getReps';
import createError from '../utils/functions/errCreater';
import { jwtVerify } from '../utils/functions/jwt';
import type { IUserAuthRequest } from '../utils/types/req';

export const tokenVerify = async (req: IUserAuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw createError(
        StatusCodes.UNAUTHORIZED,
        'Log in.',
      );
    }

    const decoded = jwtVerify(token);
    const user = await UsersRep.findOne({
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
