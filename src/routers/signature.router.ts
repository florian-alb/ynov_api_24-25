import express from "express";
import {
  getSignatureById,
  getSignatures,
  getActiveSignature,
  addSignature,
  updateSignature,
  deleteSignature,
} from "../controllers/signature.controller";
import authMiddleware from "../middlewares/auth.middleware";
import uuidValidationMiddleware from "../middlewares/validation.middleware";

const signatureRouter = express.Router();

signatureRouter.get("/", authMiddleware, getSignatures);
signatureRouter.get("/active", getActiveSignature);
signatureRouter.get(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  getSignatureById
);
signatureRouter.post("/", authMiddleware, addSignature);
signatureRouter.put(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  updateSignature
);
signatureRouter.delete(
  "/:id",
  authMiddleware,
  uuidValidationMiddleware,
  deleteSignature
);

export default signatureRouter;
