import type { NextFunction, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';
import { passwordHash, passwordVerify } from '../../utils/bcrypt';
import { createError } from '../../utils/errCreator';
import type { IReqUser } from '../../types/req';
import { userFields } from '../../utils/constants';
import { errObjCreator } from '../../utils/errObjCreator';

export const editPassword = async (req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const {
      oldPassword,
      password,
    } = req.body;
    const user = await dbReps.Users.findOne({
      select: userFields,
      where: {
        id: req.user.id,
      },
    });

    if (!passwordVerify(oldPassword, user.password)) {
      throw createError(
        ReasonPhrases.NOT_FOUND,
        [
          errObjCreator('body', 'password', 'Wrong old password'),
        ],
      );
    }

    user.password = passwordHash(password);
    await dbReps.Users.save(user);
    return res.status(StatusCodes.OK).json('Password are updated.');
  } catch (err) { next(err); }
};
