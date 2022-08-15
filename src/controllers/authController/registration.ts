import { StatusCodes } from 'http-status-codes';
import type { Response, Request, NextFunction } from 'express';
import { passwordHash } from '../../utils/bcrypt';
import createError from '../../utils/errCreator';
import { jwtSign } from '../../utils/jwt';
import { Users } from '../../database/entity/Users';
import type { IUserInfo } from '../../types/req';
import { dbReps } from '../../database/dataSource';

export const registration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password,
    } = req.body;
    if (!email && !password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required body parameters',
      );
    }

    const user0 = new Users();
    user0.email = email;
    user0.password = passwordHash(password);
    const user = await dbReps.Users.save(user0) as IUserInfo;
    delete user.password;
    user.token = jwtSign(user.id);

    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    if (err.message === 'duplicate key value violates unique constraint "UQ_97672ac88f789774dd47f7c8be3"') {
      next(createError(
        StatusCodes.BAD_REQUEST,
        'This email is already taken',
      ));
    }
    next(err);
  }
};
