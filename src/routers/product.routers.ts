import express from "express";
import { getProducts, addProduct } from "../controllers/product.controller";

// Create a new router
const productsRouter = express.Router();

// Define the routes and the functions that will be executed when those routes are requested
// The functions are imported from the controller(s)
productsRouter.get("/", getProducts);
productsRouter.post("/", addProduct);

// Export the router to be used on the app
export default productsRouter;
