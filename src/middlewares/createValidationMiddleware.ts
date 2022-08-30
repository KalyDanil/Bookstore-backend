import type { NextFunction, Request, Response } from 'express';
import { ReasonPhrases } from 'http-status-codes';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import type { ObjectShape } from 'yup/lib/object';
import type { ErrDataType } from '../types/middlewares';
import { createError } from '../utils/errCreator';
import { errObjCreator } from '../utils/errObjCreator';

YupPassword(yup);

export const createValidationMiddleware = (yupValidationShape: ObjectShape, path: 'body' | 'query' | 'params') => {
  const schema = yup.object().shape(yupValidationShape);
  const validation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req[path], { abortEarly: false });
      next();
    } catch (err) {
      const data: ErrDataType = [];
      for (const error of err.errors) {
        const field = error.split(' ')[0];
        data.push(
          errObjCreator(path, field, error),
        );
      }
      next(createError(
        ReasonPhrases.BAD_REQUEST,
        data,
      ));
    }
  };
  return validation;
};
