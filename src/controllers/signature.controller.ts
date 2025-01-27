import {
  add,
  getActive,
  getAll,
  getById,
  update,
  deleteById,
} from "../services/signature.service";
import { RequestHandler } from "express";
import { IAuthenticatedRequest } from "../types/express";
import { AppError } from "../types/appError";
import { errorHandler } from "../utils/errorHandler";
import { asyncHandler } from "../handlers/asyncHandler";

export const getSignatures: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    let signatures;

    try {
      signatures = await getAll(req.user?.id, page, limit);
    } catch (err) {
      return next(errorHandler(err, "Error while getting the signatures", 501));
    }

    res.json({
      success: true,
      data: signatures,
    });
  }
);

export const getSignatureById: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const signature = await getById(req.user?.id, req.params.id);

    if (!signature) {
      return next(new AppError("Signature not found", 404));
    }

    res.json({
      success: true,
      data: signature,
    });
  }
);

export const getActiveSignature: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const signature = await getActive(req.user?.id);

    if (!signature) {
      return next(new AppError("Active signature not found", 404));
    }

    res.json({
      success: true,
      data: signature,
    });
  }
);

export const addSignature: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const signature = await add(req.user?.id, req.body);

    if (!signature) {
      return next(new AppError("Error while creating a new signature", 501));
    }

    res.status(201).json({
      success: true,
      data: signature,
    });
  }
);

export const updateSignature: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    let signature;

    try {
      signature = await update(req.user?.id, req.params.id, req.body);
    } catch (err) {
      return next(errorHandler(err, "Error while updating the signature", 501));
    }

    res.json({
      success: true,
      data: signature,
    });
  }
);

export const deleteSignature: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const hasBeenDeleted = await deleteById(req.user?.id, req.params.id);
    if (!hasBeenDeleted) {
      return next(new AppError("Signature not found", 404));
    }

    res.status(204).json({
      success: true,
      message: "Signature deleted",
    });
  }
);
