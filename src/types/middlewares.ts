export type PathErrType = 'body' | 'query' | 'params' | 'headers';

export interface IErrObject {
  path: PathErrType;
  key: string;
  message: string;
}

export type ErrDataType = Array<IErrObject>;

export interface ICustomPayload {
  message: string;
  data: ErrDataType;
}

export interface IErr extends Error {
  customPayload: ICustomPayload;
}

export interface IShemaParameters {
  fullName?: string;
  email?: string;
  password?: string;
}
