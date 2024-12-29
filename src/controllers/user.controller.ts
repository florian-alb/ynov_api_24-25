import { RequestHandler } from "express";
import {
  create,
  login,
  deleteById,
  getById,
  update,
} from "../services/user.service";

import { IAuthenticatedRequest } from "../types/express";
import { AppError } from "../types/appError";
import { errorHandler } from "../utils/errorHandler";
import { asyncHandler } from "../handlers/asyncHandler";

export const getUser: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const user = await getById(req.user?.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.json({
      success: true,
      data: user,
    });
  }
);

export const registerUser: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { name, emailAddress, password } = req.body;
    let user;

    try {
      user = await create({ name, emailAddress, password });
    } catch (err) {
      return next(errorHandler(err, "Error while creating a new account", 501));
    }

    res.status(201).json({
      success: true,
      data: user,
    });
  }
);

export const loginUser: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { emailAddress, password } = req.body;

    try {
      const token = await login({ emailAddress, password });

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    } catch {
      next(new AppError("Invalid credentials", 401));
    }
  }
);

export const deleteUser: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const hasBeenDeleted = await deleteById(req.user?.id);
    if (!hasBeenDeleted) {
      return next(new AppError("User not found", 404));
    }

    res.status(204).json({
      success: true,
      message: "User deleted",
    });
  }
);

export const updateUser: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res) => {
    const updatedUser = await update(req.user?.id, req.body);

    res.json({
      success: true,
      data: updatedUser,
    });
  }
);
