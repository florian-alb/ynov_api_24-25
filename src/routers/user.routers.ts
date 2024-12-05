import express from "express";
import { add, get } from "../controllers/user.controller";

// Create a new router
const userRouter = express.Router();

// Define the routes and the functions that will be executed when those routes are requested
// The functions are imported from the controller(s)
userRouter.get("/", get);
userRouter.post("/", add);

// Export the router to be used on the app
export default userRouter;
