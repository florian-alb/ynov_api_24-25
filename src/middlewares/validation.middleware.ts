import { NextFunction, Request, Response } from "express";
import { validate as isUuid } from "uuid";

const uuidValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params["id"];
  if (!isUuid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid UUID format",
    });
    return;
  }
  next();
};

export default uuidValidationMiddleware;
