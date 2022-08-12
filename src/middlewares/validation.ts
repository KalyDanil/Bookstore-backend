import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createError from '../utils/functions/errCreater';
import { validationGenerator } from '../utils/functions/validation';

export const validation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    try {
      await validationGenerator(req.body.schema, req.body).next();
    } catch(err) {
      throw createError(
        StatusCodes.NOT_ACCEPTABLE,
        err.message,
      );
    }
    next();
  } catch (err) { next(err); }
};