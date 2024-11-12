import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/appError";

export function openApiValidatorMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
}
