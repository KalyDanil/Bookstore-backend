import type { Response, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import type { IErr } from '../utils/types/middlewares';

export default (err: IErr, req: Request, res: Response) => {
  if (err.customPayload) {
    return res.status(err.customPayload.statusCode).json(err.customPayload.message);
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};
