export interface ICustomPayload {
  statusCode: number;
  message: string;
}

export interface IErr extends Error {
  customPayload: ICustomPayload;
}

export interface IShemaParameters {
  fullName?: string;
  email?: string;
  password?: string;
}
