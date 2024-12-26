import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type GetUserAuthInfoRequest = Request & {
  user: JwtPayload;
};

export interface IGetUserAuthInfoRequest extends Request {
  user: JwtPayload; // Définit la propriété `user`
}

export type RequestWithBody<T> = Request & {
  body: T;
};

export type ResponseWithData<T> = Response & {
  success: boolean;
  data: T;
};
