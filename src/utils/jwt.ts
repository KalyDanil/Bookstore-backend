import jwt from 'jsonwebtoken';
import config from '../config';
import type { IJwtVerify } from '../types/req';

export const jwtSign = (userId: number) => {
  return jwt.sign({ id: userId }, config.tokenKey, { expiresIn: config.expiresIn });
};

export const jwtVerify = (token: string) => {
  const decoded = jwt.verify(token, config.tokenKey) as IJwtVerify;
  return decoded;
};
