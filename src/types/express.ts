import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IAuthenticatedRequest extends Request {
  user?: JwtPayload; // Add the user to the request object
}
