import { Users } from '../../database/entity/Users';
import type { IJson } from '../types/req';

export const jsonTransformation = (user: Users): IJson => {
  return JSON.parse(JSON.stringify(user));
};
