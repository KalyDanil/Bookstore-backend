import type { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';
import { LikedBooks } from '../../database/entity/LikedBooks';

export const likeUnLikeBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      userId,
      bookId,
      like = false,
    } = req.body;

    if (like === false) {
      await dbReps.LikedBooks.delete({
        bookId,
        userId,
      });
      return res.status(StatusCodes.OK).json('Book was unliked');
    }

    const likedBook = new LikedBooks();
    likedBook.bookId = bookId;
    likedBook.userId = userId;
    await dbReps.LikedBooks.save(likedBook);

    return res.status(StatusCodes.OK).json('Book was liked');
  } catch (err) { next(err); }
};
