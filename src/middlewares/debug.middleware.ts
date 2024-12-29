import { Request, Response, NextFunction } from "express";
import debugLib from "debug";

// Crée un namespace "app:requests" pour le debug
const debug = debugLib("app:requests");

// Middleware de debug
export function debugMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  debug(`Incoming request: ${req.method} ${req.url}`);

  //debug(`Headers: ${JSON.stringify(req.headers)}`);

  next();
}
