import type { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';
import { CartBooks } from '../../database/entity/CartBooks';

export const addBookToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      userId,
      bookId,
    } = req.body;

    const book = await dbReps.CartBooks.findOne({
      where: {
        bookId,
        userId,
      },
    });

    if (!book) {
      const book = new CartBooks();
      book.amount = 1;
      book.bookId = bookId;
      book.userId = userId;
      await dbReps.CartBooks.save(book);
    }

    return res.status(StatusCodes.OK).json('Book was added');
  } catch (err) { next(err); }
};
