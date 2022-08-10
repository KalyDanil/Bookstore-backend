import config from '../../config';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(config.saltRounds);

export const passwordHash = (password: string) => {
  return bcrypt.hashSync(password, salt);
};

export const passwordVerify = (password: string, userPassword: string) => {
  return bcrypt.compareSync(password, userPassword);
};

// export default {
//   passwordHash,
//   passwordVerify,
// }