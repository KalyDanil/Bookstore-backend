import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import type { Response, Request, NextFunction } from 'express';
import { passwordHash } from '../../utils/bcrypt';
import { createError } from '../../utils/errCreator';
import { jwtSign } from '../../utils/jwt';
import { Users } from '../../database/entity/Users';
import { dbReps } from '../../database/dataSource';
import { errObjCreator } from '../../utils/errObjCreator';
import { uploadFromPath } from '../../utils/constants';

export const registration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const user0 = new Users();
    user0.email = email;
    user0.password = passwordHash(password);
    user0.avatar = `${uploadFromPath}defaultAvatar.svg`;
    const user = await dbReps.Users.save(user0);
    delete user.password;
    const answer = {
      user,
      token: jwtSign(user.id),
    };
    return res.status(StatusCodes.OK).json(answer);
  } catch (err) {
    if (err.message === 'duplicate key value violates unique constraint "UQ_97672ac88f789774dd47f7c8be3"') {
      next(createError(
        ReasonPhrases.BAD_REQUEST,
        [
          errObjCreator('body', 'email', 'This email is already taken'),
        ],
      ));
    }
    next(err);
  }
};
