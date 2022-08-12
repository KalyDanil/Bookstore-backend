import { StatusCodes } from 'http-status-codes';
import type { Response, Request, NextFunction } from 'express';
import { passwordHash } from '../../utils/functions/bcrypt';
import createError from '../../utils/functions/errCreater';
import { jsonTransformation } from '../../utils/functions/json';
import { jwtSign } from '../../utils/functions/jwt';
import { Users } from '../../database/entity/Users';
import { UsersRep } from '../../database/getReps';

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
    const user = await UsersRep.save(user0);
    const answer = jsonTransformation(user);
    delete answer.password;
    answer.token = jwtSign(user.id);

    return res.status(200).json(answer);
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