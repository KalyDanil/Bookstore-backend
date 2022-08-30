import type { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';

export const getAllLikedBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = '1',
      limit,
      userId,
    } = req.query;

    const skip = ((+page) - 1) * (+4);
    const [list, count] = await dbReps.Books.findAndCount({
      relations: {
        likedBooks: true,
      },
      where: {
        likedBooks: { userId: +userId },
      },
      skip,
      take: +limit,
    });

    return res.status(StatusCodes.OK).json({ books: list, booksCount: count });
  } catch (err) { next(err); }
};
