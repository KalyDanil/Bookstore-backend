import { IJson } from '../types/req';

export const jsonTransformation = (user: Object): IJson => {
  return JSON.parse(JSON.stringify(user))
};