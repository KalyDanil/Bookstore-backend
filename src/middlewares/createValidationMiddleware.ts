import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import type { ObjectShape } from 'yup/lib/object';
import { IErrMessage } from '../types/middlewares';
import createError from '../utils/errCreator';

YupPassword(yup);

export const createValidationMiddleware = (yupValidationShape: ObjectShape) => {
  const schema = yup.object().shape(yupValidationShape);
  const validation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      const errMessage: IErrMessage = [];
      for(let error of err.errors) {
        const field = error.split(' ')[0];
        switch (field) {
          case 'email':
            errMessage.push({
              email: error,
            });
            break;
          case 'password':
            errMessage.push({
              password: error,
            });
            break;
          case 'oldPassword':
            errMessage.push({
              oldPassword: error,
            });
            break;
          case 'fullName':
            errMessage.push({
              fullName: error,
            });
            break;
        }
      }
      next(createError(
        StatusCodes.BAD_REQUEST,
        errMessage,
      ));
    }
  };
  return validation;
};
