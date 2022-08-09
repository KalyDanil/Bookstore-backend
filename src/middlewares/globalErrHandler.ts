import { Err } from '../utils/types/middlewares';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Response, Request } from 'express';

export default (err: Err, req: Request, res: Response) => {
  if (err.customPayload) {
    console.log(err.customPayload.message);
    return res.status(err.customPayload.statusCode).json(err.customPayload.message);
  };

  console.log(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};
