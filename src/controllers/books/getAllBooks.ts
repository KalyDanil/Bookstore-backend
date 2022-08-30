import { StatusCodes } from 'http-status-codes';
import type { Response, Request, NextFunction } from 'express';
import { Between, In, Like } from 'typeorm';
import { dbReps } from '../../database/dataSource';

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      genres: queryGenres,
      minPrice,
      maxPrice,
      search = '',
      sortBy: querySortBy = 'name',
      page = '1',
      limit,
    } = req.query;
    const selectedGenres = queryGenres as string[];
    const sortBy = querySortBy as string;
    let inOrder = 'ASC';

    if (sortBy === 'rating') {
      inOrder = 'DESC';
    }

    const skip = ((+page) - 1) * (+4);
    const [list, count] = await dbReps.Books.findAndCount({
      relations: {
        genres: true,
        likedBooks: true,
      },
      where: [
        {
          genres: selectedGenres ? { id: In(selectedGenres) } : {},
          price: Between(+minPrice, +maxPrice),
          name: Like(`%${search}%`),
        },
        {
          genres: selectedGenres ? { id: In(selectedGenres) } : {},
          price: Between(+minPrice, +maxPrice),
          authorName: Like(`%${search}%`),
        },
      ],
      order: {
        [sortBy]: inOrder,
      },
      skip,
      take: +limit,
    });

    const price = await dbReps.Books.find({
      select: { price: true },
    });

    price.sort((a, b) => { return a.price - b.price; });
    const elementaryMinPrice = price[0].price;
    price.sort((a, b) => { return -a.price + b.price; });
    const elementaryMaxPrice = price[0].price;

    const genres = await dbReps.Genres.find();

    return res.status(StatusCodes.OK).json({
      books: list,
      booksCount: count,
      genres,
      minPrice: elementaryMinPrice,
      maxPrice: elementaryMaxPrice,
    });
  } catch (err) { next(err); }
};
