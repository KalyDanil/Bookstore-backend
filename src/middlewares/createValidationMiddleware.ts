import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import type { ObjectShape } from 'yup/lib/object';
import createError from '../utils/errCreator';

YupPassword(yup);

export const createValidationMiddleware = (yupValidationShape: ObjectShape) => {
  const schema = yup.object().shape(yupValidationShape);
  const validation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (err) {
      next(createError(
        StatusCodes.NOT_ACCEPTABLE,
        err.message,
      ));
    }
  };
  return validation;
};
