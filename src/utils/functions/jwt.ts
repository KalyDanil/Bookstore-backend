import config from '../../config';
import jwt from 'jsonwebtoken';

export const jwtSign = (userId: number) => {
  return jwt.sign({ id: userId }, config.tokenKey, { expiresIn: config.expiresIn })
};

export const jwtVerify = (token: string): any => {
  return jwt.verify(token, config.tokenKey)
};
