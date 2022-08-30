import express from 'express';
import { changeRating } from '../controllers/books/changeRating';
import { getAllBooks } from '../controllers/books/getAllBooks';
import { getBook } from '../controllers/books/getBook';
import { getAllLikedBooks } from '../controllers/books/getLikedBooks';
import { getRecommendedBooks } from '../controllers/books/getRecommendations';
import { likeUnLikeBook } from '../controllers/books/LikeUnLikeBook';
import { addBookToCart } from '../controllers/cart/addBookToCart';
import { changeBooksAmount } from '../controllers/cart/changeBooksAmount';
import { deleteBookFromCart } from '../controllers/cart/deleteBookFromCart';
import { getCartBooks } from '../controllers/cart/getCartBooks';
import { makeComment } from '../controllers/comments/makeComment';
import { createValidationMiddleware } from '../middlewares/createValidationMiddleware';
import { changeRatingShape, getAllBooksShape, getAllLikedBooksShape, getBookShape, getRecommendationShape, likeUnLikeBookShape } from '../utils/schemas/books';
import { addBookToCartShape, changeBooksAmountShape, deleteBookFromCartShape, getCartBooksShape } from '../utils/schemas/cart';
import { makeCommentShape } from '../utils/schemas/comments';

const booksRouter = express.Router();

booksRouter.get('/', createValidationMiddleware(getAllBooksShape, 'query'), getAllBooks);
booksRouter.get('/liked-books', createValidationMiddleware(getAllLikedBooksShape, 'query'), getAllLikedBooks);
booksRouter.get('/book-page', createValidationMiddleware(getBookShape, 'query'), getBook);
booksRouter.get('/book-page/recommendations', createValidationMiddleware(getRecommendationShape, 'query'), getRecommendedBooks);
booksRouter.put('/book-page/to-like', createValidationMiddleware(likeUnLikeBookShape, 'body'), likeUnLikeBook);
booksRouter.post('/book-page/comment', createValidationMiddleware(makeCommentShape, 'body'), makeComment);
booksRouter.put('/book-page/change-rating', createValidationMiddleware(changeRatingShape, 'body'), changeRating);
booksRouter.put('/book-page/add-to-cart', createValidationMiddleware(addBookToCartShape, 'body'), addBookToCart);
booksRouter.put('/book-page/change-books-amount', createValidationMiddleware(changeBooksAmountShape, 'body'), changeBooksAmount);
booksRouter.post('/book-page/delete-book-from-cart', createValidationMiddleware(deleteBookFromCartShape, 'body'), deleteBookFromCart);
booksRouter.get('/cart', createValidationMiddleware(getCartBooksShape, 'query'), getCartBooks);

export default booksRouter;
