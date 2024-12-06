import { NextFunction, Request, Response } from "express";
import { getAll, create, login } from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  const data = await getAll(
    req.query.sortBy as string | undefined,
    req.query.sortDir as "asc" | "desc" | undefined
  );
  res.json({
    success: true,
    data,
  });
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, emailAddress, password } = req.body;
  let user;

  try {
    user = await create({ name, emailAddress, password });
  } catch (err) {
    return next(err);
  }

  res.json({
    success: true,
    data: user,
  });
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { emailAddress, password } = req.body;
  let token;

  try {
    token = await login({ emailAddress, password });
  } catch (err) {
    return next(err);
  }

  res.json({
    success: true,
    message: "Login successful",
    token: token,
  });
};
