import type { PathErrType } from '../types/middlewares';

export const errObjCreator = (path: PathErrType, key: string, message: string) => {
  const data = {
    path,
    key,
    message,
  };
  return data;
};
