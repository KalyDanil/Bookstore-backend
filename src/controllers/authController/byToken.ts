import type { Response, NextFunction } from 'express';
import type { IUserAuthRequest } from '../../utils/types/req';

export const authorizationByToken = async (req: IUserAuthRequest, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) { next(err); }
};
