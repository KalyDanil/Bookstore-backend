import { type } from 'os';

export interface ICustomPayload {
  statusCode: number;
  message: string | IErrMessage;
}

export interface IErr extends Error {
  customPayload: ICustomPayload;
}

export type IErrMessage = Array<object>;

export interface IShemaParameters {
  fullName?: string;
  email?: string;
  password?: string;
}
