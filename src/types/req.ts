import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { Users } from '../database/entity/Users';

interface IHeaders extends Headers {
  authorization: string;
}

export interface IReqUser extends Request {
  user: Users;
  Headers: IHeaders;
  image: {
    imageName: string;
  };
}

export interface IJwtVerify extends JwtPayload {
  id: number;
}
