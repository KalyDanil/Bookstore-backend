import type { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { In, Not } from 'typeorm';
import { dbReps } from '../../database/dataSource';

export const getRecommendedBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      limit,
      userId,
      bookId,
    } = req.query;

    const genresId = [];
    const likedbooksId = [];
    likedbooksId.push(bookId);

    const likedBooks = await dbReps.Books.find({
      relations: {
        likedBooks: true,
        genres: true,
      },
      where: {
        likedBooks: { userId: +userId },
      },
    });
    /* eslint-disable */
    likedBooks.map((item) => {
      for (let i = 0; i < item.genres.length; i++) {
        genresId.push(item.genres[i].id);
        likedbooksId.push(item.id);
      }
    });
    /* eslint-enable */
    const recommendations = await dbReps.Books.find({
      relations: {
        genres: true,
      },
      where: {
        genres: { id: In(genresId) },
        id: Not(In(likedbooksId)),
      },
      skip: 0,
      take: +limit,
    });
    return res.status(StatusCodes.OK).json(recommendations);
  } catch (err) { next(err); }
};
