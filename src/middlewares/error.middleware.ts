import { Request, Response } from "express";
import { AppError } from "../types/appError";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response
): void => {
  console.error("Error:", err.message);

  // Checks if headers have already been sent
  if (res.headersSent) {
    console.error("Headers already sent for request:", req.originalUrl);
    return;
  }

  console.error(`[${new Date().toISOString()}] ${err.message}`);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || null;

  res.status(status).json({
    success: false,
    status,
    message,
    errors,
  });
};
