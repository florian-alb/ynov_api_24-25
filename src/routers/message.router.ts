import express from "express";
import {
  getMessageById,
  getMessages,
  addMessage,
  updateMessageStatus,
  deleteMessage,
  moveMessageToFolder,
  toggleMessageFavorite,
  toggleMessageTrash,
  sendMessage,
} from "../controllers/message.controller";
import authMiddleware from "../middlewares/auth.middleware";
import uuidValidationMiddleware from "../middlewares/validation.middleware";

const messageRouter = express.Router();

messageRouter.get("/", authMiddleware, getMessages);

messageRouter.get(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  getMessageById
);

messageRouter.post("/", authMiddleware, addMessage);

messageRouter.put(
  "/:id/status",
  authMiddleware,
  uuidValidationMiddleware,
  updateMessageStatus
);

messageRouter.put(
  "/:id/folder",
  authMiddleware,
  uuidValidationMiddleware,
  moveMessageToFolder
);

messageRouter.put(
  "/:id/favorite",
  authMiddleware,
  uuidValidationMiddleware,
  toggleMessageFavorite
);

messageRouter.put(
  "/:id/trash",
  authMiddleware,
  uuidValidationMiddleware,
  toggleMessageTrash
);

messageRouter.put(
  "/:id/send",
  authMiddleware,
  uuidValidationMiddleware,
  sendMessage
);

messageRouter.delete(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  deleteMessage
);

export default messageRouter;
