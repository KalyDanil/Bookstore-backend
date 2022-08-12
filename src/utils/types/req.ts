import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

interface IUserInfo {
  id: number;
  email: string;
  fullName: string | null;
  avatar: string;
  password: string;
}

interface IHeaders extends Headers {
  authorization: string;
}

export interface IUserAuthRequest extends Request {
  user: IUserInfo;
  Headers: IHeaders;
}

export interface IJson extends JSON {
  password: string;
  token: string;
}

export interface IJwtVerify extends JwtPayload {
  id: number;
}
