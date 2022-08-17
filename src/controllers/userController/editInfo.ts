import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';
import createError from '../../utils/errCreator';
import type { IReqUser } from '../../types/req';

export const editInfo = async (req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      fullName,
    } = req.body;
    const id = req.user.id;
    const user = await dbReps.Users.findOneBy({
      id,
    });
    user.email = email;
    user.fullName = fullName;
    await dbReps.Users.save(user);
    return res.status(StatusCodes.OK).json('User are updated.');
  } catch (err) {
    if (err.message === 'duplicate key value violates unique constraint "UQ_97672ac88f789774dd47f7c8be3"') {
      next(createError(
        StatusCodes.NOT_ACCEPTABLE,
        [{email: 'This email is already taken'}],
      ));
    }
    next(err);
  }
};
