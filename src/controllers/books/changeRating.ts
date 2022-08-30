import type { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';
import { BookRatings } from '../../database/entity/BookRatings';

export const changeRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      bookId,
      userId,
      rating,
    } = req.body;

    const user = await dbReps.BookRatings.findOne({
      where: {
        bookId,
        userId,
      },
    });

    if (user) {
      user.rating = rating;
      await dbReps.BookRatings.save(user);
    } else {
      const firstRating = new BookRatings();
      firstRating.bookId = bookId;
      firstRating.userId = userId;
      firstRating.rating = rating;
      await dbReps.BookRatings.save(firstRating);
    }

    const selectedBook = await dbReps.Books.findOne({
      relations: {
        bookRatings: true,
      },
      where: {
        id: bookId,
      },
    });

    let ratingSum = 0;
    selectedBook.bookRatings.map((item) => { ratingSum += item.rating; return ratingSum; });
    let ratingAmount = selectedBook.bookRatings.length;

    for (let i = 0; i < selectedBook.bookRatings.length; i++) {
      if (selectedBook.bookRatings[i].rating === null) {
        ratingAmount -= 1;
      }
    }

    const bookRating = Math.round(ratingSum / ratingAmount);
    selectedBook.rating = bookRating;
    await dbReps.Books.save(selectedBook);

    return res.status(StatusCodes.OK).json('Rating was changed');
  } catch (err) { next(err); }
};
