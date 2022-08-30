import type { Response, Request, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import type { IErr } from '../types/middlewares';
// eslint-disable-next-line
export default (err: IErr, req: Request, res: Response, next: NextFunction) => {
  if (err.customPayload) {
    console.log(err.customPayload.message);
    return res.status(StatusCodes.BAD_REQUEST).send(err.customPayload);
  }
  console.log(err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};
