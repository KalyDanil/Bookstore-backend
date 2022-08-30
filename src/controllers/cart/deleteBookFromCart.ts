import type { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';

export const deleteBookFromCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      userId,
      bookId,
    } = req.body;

    await dbReps.CartBooks.delete({
      bookId,
      userId,
    });

    return res.status(StatusCodes.OK).json('Book was deleted');
  } catch (err) { next(err); }
};
