import { RequestHandler } from "express";
import { IAuthenticatedRequest } from "../types/express";
import { AppError } from "../types/appError";
import {
  add,
  deleteById,
  getAll,
  getById,
  update,
} from "../services/message.service";
import { asyncHandler } from "../handlers/asyncHandler";
import { errorHandler } from "../utils/errorHandler";

export const getMessages: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    let messages;

    try {
      messages = await getAll(req.user?.id);
    } catch (err) {
      return next(errorHandler(err, "Error while getting the messages", 501));
    }

    res.json({
      success: true,
      data: messages,
    });
  }
);

export const getMessageById: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const message = await getById(req.user?.id, req.params.id);

    if (!message) {
      return next(new AppError("Message not found", 404));
    }

    res.json({
      success: true,
      data: message,
    });
  }
);

export const addMessage: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const message = await add(req.user?.id, req.body);

    if (!message) {
      return next(new AppError("Error while creating a new message", 501));
    }

    res.status(201).json({
      success: true,
      data: message,
    });
  }
);

export const updateMessage: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    let message;

    try {
      message = await update(req.user?.id, req.params.id, req.body);
    } catch (err) {
      return next(errorHandler(err, "Error while updating the message", 501));
    }

    res.json({
      success: true,
      data: message,
    });
  }
);

export const deleteMessage: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const hasBeenDeleted = await deleteById(req.user?.id, req.params.id);
    if (!hasBeenDeleted) {
      return next(new AppError("Message not found", 404));
    }

    res.status(204).json({
      success: true,
      message: "Message deleted",
    });
  }
);
