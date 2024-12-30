import {
  add,
  getAll,
  getById,
  update,
  deleteById,
} from "../services/folder.service";
import { RequestHandler } from "express";
import { IAuthenticatedRequest } from "../types/express";
import { AppError } from "../types/appError";
import { errorHandler } from "../utils/errorHandler";
import { asyncHandler } from "../handlers/asyncHandler";

export const getFolders: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res) => {
    const folders = await getAll(req.user?.id);
    res.json({
      success: true,
      data: folders,
    });
  }
);

export const getFolderById: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const folder = await getById(req.user?.id, req.params.id);

    if (!folder) {
      return next(new AppError("Folder not found", 404));
    }

    res.json({
      success: true,
      data: folder,
    });
  }
);

export const addFolder: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    let folder;

    try {
      folder = await add(req.user?.id, req.body);
    } catch (err) {
      return next(errorHandler(err, "Error while creating a new folder", 501));
    }

    res.status(201).json({
      success: true,
      data: folder,
    });
  }
);

export const updateFolder: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    let folder;

    try {
      folder = await update(req.user?.id, req.params.id, req.body, true);
    } catch (err) {
      return next(errorHandler(err, "Error while updating the folder", 501));
    }

    res.json({
      success: true,
      data: folder,
    });
  }
);

export const deleteFolder: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    try {
      await deleteById(req.user?.id, req.params.id);
    } catch (err) {
      return next(errorHandler(err, "Error while deleting the folder", 501));
    }

    res.status(204).json({
      success: true,
      message: "Folder deleted",
    });
  }
);

export const getMessagesByFolderId: RequestHandler = asyncHandler(
  async (req: IAuthenticatedRequest, res, next) => {
    const folder = await getById(req.user?.id, req.params.id, true);

    if (!folder) {
      return next(new AppError("Folder not found", 404));
    }

    res.json({
      success: true,
      data: folder.messages,
    });
  }
);
