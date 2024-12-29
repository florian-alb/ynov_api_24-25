import {
  add,
  getAll,
  getById,
  update,
  deleteById,
} from "../services/folder.service";
import { Response } from "express";
import { IAuthenticatedRequest } from "../types/express";

export const getFolders = async (req: IAuthenticatedRequest, res: Response) => {
  const folders = await getAll(req.user?.id);
  res.json({
    success: true,
    data: folders,
  });
};

export const getFolderById = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  const folder = await getById(req.user?.id, req.params.id);

  if (!folder) {
    res.status(404).json({
      success: false,
      message: "Folder not found",
    });
  }

  res.json({
    success: true,
    data: folder,
  });
};

export const addFolder = async (req: IAuthenticatedRequest, res: Response) => {
  const folder = await add(req.user?.id, req.body);
  res.status(201).json({
    success: true,
    data: folder,
  });
};

export const updateFolder = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  const folder = await update(req.user?.id, req.params.id, req.body);

  if (!folder) {
    res.status(404).json({
      success: false,
      message: "Folder not found",
    });
  }

  res.json({
    success: true,
    data: folder,
  });
};

export const deleteFolder = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  const hasBeenDeleted = await deleteById(req.user?.id, req.params.id);
  if (!hasBeenDeleted) {
    res.status(404).json({
      success: false,
      message: "Folder not found",
    });
  }

  res.status(204).json({
    success: true,
    message: "Folder deleted",
  });
};
