import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import type { Response, Request, NextFunction } from 'express';
import { passwordVerify } from '../../utils/bcrypt';
import { createError } from '../../utils/errCreator';
import { jwtSign } from '../../utils/jwt';
import { dbReps } from '../../database/dataSource';
import { userFields } from '../../utils/constants';
import { errObjCreator } from '../../utils/errObjCreator';

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await dbReps.Users.findOne({
      select: userFields,
      where: {
        email: email.toString(),
      },
    });

    if (!user) {
      throw createError(
        ReasonPhrases.NOT_FOUND,
        [
          errObjCreator('body', 'email', 'Wrong email or password'),
          errObjCreator('body', 'password', 'Wrong email or password'),
        ],
      );
    }

    if (!passwordVerify(password.toString(), user.password)) {
      throw createError(
        ReasonPhrases.BAD_REQUEST,
        [
          errObjCreator('body', 'email', 'Wrong email or password'),
          errObjCreator('body', 'password', 'Wrong email or password'),
        ],
      );
    }

    delete user.password;
    const answer = {
      user,
      token: jwtSign(user.id),
    };
    return res.status(StatusCodes.OK).json(answer);
  } catch (err) { next(err); }
};
