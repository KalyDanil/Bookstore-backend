import type { Response, Request, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import type { IErr } from '../utils/types/middlewares';

export default (err: IErr, req: Request, res: Response, next: NextFunction) => {
  if (err.customPayload) {
    console.log(err.customPayload.message)
    return res.status(err.customPayload.statusCode).json(err.customPayload.message);
  }
  console.log(err.message)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};
