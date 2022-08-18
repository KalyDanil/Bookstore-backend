export interface ICustomPayload {
  statusCode: number;
  message: string | ErrMessageType;
}

export interface IErr extends Error {
  customPayload: ICustomPayload;
}

export type ErrMessageType = Array<object>;

export interface IShemaParameters {
  fullName?: string;
  email?: string;
  password?: string;
}
