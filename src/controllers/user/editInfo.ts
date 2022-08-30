import type { NextFunction, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';
import { createError } from '../../utils/errCreator';
import type { IReqUser } from '../../types/req';
import { errObjCreator } from '../../utils/errObjCreator';

export const editInfo = async (req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      fullName,
    } = req.body;
    const id = req.user.id;

    await dbReps.Users.update({
      id,
    }, {
      email,
      fullName,
    });

    const user = await dbReps.Users.findOne({
      where: {
        id,
      },
    });

    await dbReps.Comments.update({
      user,
    }, {
      commentator: fullName,
    });

    return res.status(StatusCodes.OK).json('User are updated.');
  } catch (err) {
    if (err.message === 'duplicate key value violates unique constraint "UQ_97672ac88f789774dd47f7c8be3"') {
      next(createError(
        ReasonPhrases.NOT_ACCEPTABLE,
        [
          errObjCreator('body', 'email', 'This email is already taken'),
        ],
      ));
    }
    next(err);
  }
};
