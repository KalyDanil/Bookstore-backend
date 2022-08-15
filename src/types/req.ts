import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface IUserInfo {
  id: number;
  email: string;
  fullName: string | null;
  avatar: string;
  password: string;
  token?: string;
}

interface IHeaders extends Headers {
  authorization: string;
}

export interface IReqUser extends Request {
  user: IUserInfo;
  Headers: IHeaders;
  image: {
    imageName: string;
  };
}

export interface IJson extends JSON {
  password: string;
  token: string;
}

export interface IJwtVerify extends JwtPayload {
  id: number;
}
