import type { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';

export const changeBooksAmount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      userId,
      bookId,
      amount,
    } = req.body;

    await dbReps.CartBooks.update({
      bookId,
      userId,
    }, {
      amount,
    });

    return res.status(StatusCodes.OK).json('Amount of book was changed');
  } catch (err) { next(err); }
};
