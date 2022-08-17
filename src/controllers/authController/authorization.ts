import { StatusCodes } from 'http-status-codes';
import type { Response, Request, NextFunction } from 'express';
import { passwordVerify } from '../../utils/bcrypt';
import createError from '../../utils/errCreator';
import { jwtSign } from '../../utils/jwt';
import type { IUserInfo } from '../../types/req';
import { dbReps } from '../../database/dataSource';

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await dbReps.Users.findOne({
      select: {
        id: true,
        fullName: true,
        email: true,
        avatar: true,
        password: true,
      },
      where: {
        email: email.toString(),
      },
    }) as IUserInfo;

    if (user && passwordVerify(password.toString(), user.password)) {
      delete user.password;
      user.token = jwtSign(user.id);
      return res.status(StatusCodes.OK).json(user);
    }

    throw createError(
      StatusCodes.BAD_REQUEST,
      [
        {password: 'wrong email or password'},
        {email: 'wrong email or password'},
      ],
    );
  } catch (err) { next(err); }
};
