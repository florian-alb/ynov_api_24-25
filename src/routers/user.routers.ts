import express from "express";
import {
  loginUser,
  registerUser,
  getUsers,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/register", registerUser);
userRouter.get("/login", loginUser);

export default userRouter;
