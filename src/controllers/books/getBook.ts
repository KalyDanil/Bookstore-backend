import type { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      bookId,
      userId,
    } = req.query;

    const book = await dbReps.Books.findOne({
      relations: {
        comments: true,
        likedBooks: true,
      },
      where: { id: +bookId },
    });

    const answer = {
      book,
      comments: book.comments,
      userRating: 0,
    };

    const user = await dbReps.BookRatings.findOne({
      where: {
        bookId: +bookId,
        userId: +userId,
      },
    });

    if (user) {
      answer.userRating = user.rating;
    }
    return res.status(StatusCodes.OK).json(answer);
  } catch (err) { next(err); }
};
