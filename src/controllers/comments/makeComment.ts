import type { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dbReps } from '../../database/dataSource';
import { Comments } from '../../database/entity/Comments';

export const makeComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      bookId,
      userId,
      comment,
      commentDate,
    } = req.body;

    const user = await dbReps.Users.findOne({
      where: {
        id: userId,
      },
    });

    const book = await dbReps.Books.findOne({
      where: {
        id: bookId,
      },
    });

    const newComment = new Comments();
    newComment.book = book;
    newComment.user = user;
    newComment.comment = comment;
    newComment.avatar = user.avatar;
    newComment.commentator = user.fullName;
    newComment.time = commentDate;
    await dbReps.Comments.save(newComment);

    return res.status(StatusCodes.OK).json('Comment was created');
  } catch (err) { next(err); }
};
