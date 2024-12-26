import { NextFunction, Request, Response } from "express";
import {
  create,
  login,
  deleteById,
  getById,
  update,
} from "../services/user.service";

export const getUser = async (req: any, res: any) => {
  const user = await getById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    data: user,
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

  res.status(201).json({
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

export const deleteUser = async (req: any, res: any) => {
  const hasBeenDeleted = await deleteById(req.user.id);
  if (!hasBeenDeleted) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(204).json({
    success: true,
    message: "User deleted",
  });
};

export const updateUser = async (req: any, res: Response) => {
  const updatedUser = await update(req.user.id, req.body);

  res.json({
    success: true,
    data: updatedUser,
  });
};
