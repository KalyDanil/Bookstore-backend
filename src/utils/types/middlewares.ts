export interface CustomPayload {
    statusCode: number,
    message: string,
  }

export interface Err extends Error {
    customPayload: CustomPayload; 
}