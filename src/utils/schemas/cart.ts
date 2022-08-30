import * as yup from 'yup';

export const addBookToCartShape = {
  bookId: yup.string().required(),
  userId: yup.number().required(),
};

export const changeBooksAmountShape = {
  bookId: yup.string().required(),
  userId: yup.number().required(),
  amount: yup.number().required(),
};

export const deleteBookFromCartShape = {
  bookId: yup.string().required(),
  userId: yup.number().required(),
};

export const getCartBooksShape = {
  userId: yup.number().required(),
};
