import { Request } from "express"
import { JwtPayload } from 'jsonwebtoken'

interface IUserAuthInfo {
  id: number,
  email: string,
  fullName: string | null,
  avatar: string,
  password: string
}

interface IHeaders extends Headers {
  authorization: string
}

export interface IUserAuthInfoRequest extends Request {
  user: IUserAuthInfo,
  Headers:  IHeaders
}

export interface IJson extends JSON {
  password: string,
  token: string 
}

export interface IJwtVerify extends JwtPayload {
  id: number;
}