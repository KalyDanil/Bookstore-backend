import { StatusCodes } from 'http-status-codes';
import type { Response, Request, NextFunction } from 'express';
import { passwordVerify } from '../../utils/functions/bcrypt';
import createError from '../../utils/functions/errCreater';
import { jsonTransformation } from '../../utils/functions/json';
import { jwtSign } from '../../utils/functions/jwt';
import { UsersRep } from '../../database/getReps';

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password,
    } = req.query;

    if (!email && !password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required body parameters',
      );
    }

    const user = await UsersRep.findOne({
      select: {
        id: true,
        fullName: true,
        email: true,
        avatar: true,
        password: true
      },
      where: {
        email: email.toString(),
      }
    });

    if (user && passwordVerify(password.toString(), user.password)) {
      const answer = jsonTransformation(user);
      delete answer.password;
      answer.token = jwtSign(user.id);
      return res.status(200).json(answer);
    }

    throw createError(
      StatusCodes.BAD_REQUEST,
      'Wrong email or password',
    );
  } catch (err) { next(err); }
};
