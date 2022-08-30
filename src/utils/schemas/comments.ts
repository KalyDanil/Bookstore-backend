import * as yup from 'yup';

export const makeCommentShape = {
  bookId: yup.string().required(),
  userId: yup.number().required(),
  comment: yup.string().required(),
  commentDate: yup.date().required(),
};
