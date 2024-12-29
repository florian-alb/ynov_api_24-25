import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthenticatedRequest } from "../types/express";
import { AppError } from "../types/appError";

const authMiddleware: RequestHandler = (
  req: IAuthenticatedRequest,
  _res,
  next
) => {
  const token = req.headers?.authorization?.replace("Bearer ", ""); // Get the token from the headers and remove the Bearer part from the token

  if (!token) {
    return next(new AppError("No token provided", 401));
  }

  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload; // Verify the token
    // Add the user to the request object, to be used in the next controller
    req.user = decoded;
    next();
  } catch {
    return next(new AppError("Invalid token", 401));
  }
};

export default authMiddleware;
