import type { IErr, ErrMessageType } from '../types/middlewares';

const createError = (statusCode: number, message: string | ErrMessageType) => {
  const err = new Error('') as IErr;
  err.customPayload = {
    statusCode,
    message,
  };
  return err;
};

export default createError;
