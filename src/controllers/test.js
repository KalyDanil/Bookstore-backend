const db = require('../database/models/index');
const { Op } = require('sequelize');
const createError = require('../utils/functions/errCreater');
const { StatusCodes } = require('http-status-codes');

const { models } = db.sequelize;

const makeComment = async (req, res, next) => {
  try {
    const {
      bookId,
      userId,
      comment,
      commentDate
    } = req.body;

    if (!userId && !bookId && !comment && !commentDate) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required query parameters',
      );
    }

    const user = await models.User.findByPk(userId);

    models.Comment.create({
      BookId: bookId,
      comment: comment,
      UserId: user.id,
      avatar: user.avatar,
      commentator: user.fullName,
      createdAt: commentDate
    })

    return res.status(200).json('Comment was created');
  } catch (err) { next(err); }
}

module.exports = {
  makeComment,
}