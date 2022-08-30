import type { IErr, ErrDataType } from '../types/middlewares';

export const createError = (message: string, data: ErrDataType) => {
  const err = new Error('') as IErr;
  err.customPayload = {
    message,
    data,
  };
  return err;
};
