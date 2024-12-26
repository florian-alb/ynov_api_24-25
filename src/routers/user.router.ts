import express from "express";
import {
  deleteUser,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/", authMiddleware, updateUser);
userRouter.delete("/", authMiddleware, deleteUser);

export default userRouter;
