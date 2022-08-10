import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from '../database/dataSource';
import { Users } from '../database/entity/Users';
import createError from '../utils/functions/errCreater';
import { jwtVerify } from '../utils/functions/jwt';
import { IJwtVerify, IUserAuthInfoRequest } from '../utils/types/req';

export const tokenVerify = async (req: IUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw createError(
        StatusCodes.UNAUTHORIZED,
        'Log in.',
      );
    }
   
    const decoded: IJwtVerify = jwtVerify(token);
    console.log(decoded.id)
    const user = await AppDataSource.getRepository(Users).findOne({
      select: {
        id: true,
        fullName: true,
        email: true,
        avatar: true
      },
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
}