import type { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';

export const getCartBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      userId,
    } = req.query;

    const cartBooks = await dbReps.Books.find({
      relations: {
        cartBooks: true,
      },
      where: {
        cartBooks: {
          userId: +userId,
        },
      },
      order: {
        name: 'ASC',
      },
    });
    return res.status(StatusCodes.OK).json(cartBooks);
  } catch (err) { next(err); }
};
