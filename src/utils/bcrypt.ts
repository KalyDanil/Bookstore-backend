import bcrypt from 'bcryptjs';
import config from '../config';

const salt = bcrypt.genSaltSync(config.saltRounds);

export const passwordHash = (password: string) => {
  return bcrypt.hashSync(password, salt);
};

export const passwordVerify = (password: string, userPassword: string) => {
  return bcrypt.compareSync(password, userPassword);
};
