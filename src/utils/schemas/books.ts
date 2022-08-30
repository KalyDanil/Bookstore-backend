import * as yup from 'yup';

export const getAllBooksShape = {
  minPrice: yup.string().required(),
  maxPrice: yup.string().required(),
  limit: yup.number().required(),
  userId: yup.number().required(),
};

export const getBookShape = {
  bookId: yup.string().required(),
  userId: yup.number().required(),
};

export const getAllLikedBooksShape = {
  limit: yup.string().required(),
  userId: yup.number().required(),
};

export const getRecommendationShape = {
  bookId: yup.string().required(),
  userId: yup.number().required(),
  limit: yup.string().required(),
};

export const likeUnLikeBookShape = {
  bookId: yup.string().required(),
  userId: yup.number().required(),
};

export const changeRatingShape = {
  bookId: yup.string().required(),
  userId: yup.number().required(),
  rating: yup.string().required(),
};
