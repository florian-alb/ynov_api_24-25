import express from "express";
import {
  getMessageById,
  getMessages,
  addMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message.controller";
import authMiddleware from "../middlewares/auth.middleware";
import uuidValidationMiddleware from "../middlewares/validation.middleware";

const signatureRouter = express.Router();

signatureRouter.get("/", authMiddleware, getMessages);
signatureRouter.get(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  getMessageById
);
signatureRouter.post("/", authMiddleware, addMessage);
signatureRouter.put(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  updateMessage
);
signatureRouter.delete(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  deleteMessage
);

export default signatureRouter;
