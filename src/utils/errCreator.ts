import type { IErr, IErrMessage } from '../types/middlewares';

const createError = (statusCode: number, message: string | IErrMessage) => {
  const err = new Error('') as IErr;
  err.customPayload = {
    statusCode,
    message,
  };
  return err;
};

export default createError;
