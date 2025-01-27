import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import uuidValidationMiddleware from "../middlewares/validation.middleware";
import {
  addFolder,
  deleteFolder,
  getFolderById,
  getFolders,
  updateFolder,
} from "../controllers/folder.controller";

const folderRouter = express.Router();

folderRouter.get("/", authMiddleware, getFolders);
folderRouter.get(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  getFolderById
);
folderRouter.post("/", authMiddleware, addFolder);
folderRouter.put(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  updateFolder
);
folderRouter.delete(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  deleteFolder
);

export default folderRouter;
