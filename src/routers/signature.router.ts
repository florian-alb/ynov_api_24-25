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

const signatureRouter = express.Router();

signatureRouter.get("/", authMiddleware, getSignatures);
signatureRouter.get("/active", authMiddleware, getActiveSignature);
signatureRouter.get("/:id", authMiddleware, getSignatureById);
signatureRouter.post("/", authMiddleware, addSignature);
signatureRouter.put("/:id", authMiddleware, updateSignature);
signatureRouter.delete("/:id", deleteSignature);

export default signatureRouter;
