import type { IErr } from '../types/middlewares';

const createError = (statusCode: number, message: string) => {
  const err = new Error('') as IErr;
  err.customPayload = {
    statusCode,
    message,
  };
  return err;
};

export default createError;
