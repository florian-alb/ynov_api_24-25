import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as OpenApiValidator from "express-openapi-validator";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

//Import the routers
import userRouter from "./routers/user.router";
import signatureRouter from "./routers/signature.router";

//Debug
import { debugMiddleware } from "./middlewares/debug.middleware";
import { openApiValidatorMiddleware } from "./middlewares/openapi.middleware";
import folderRouter from "./routers/folder.router";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { AppError } from "./types/appError";

// configures dotenv to work in your application
dotenv.config();

const app = express();

// Swagger configuration
const swaggerDocument = YAML.load(__dirname + "/openApi/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cors()); // Cors is a middleware that allows/disallows access to the API

app.use(
  OpenApiValidator.middleware({
    apiSpec: __dirname + "/openApi/openapi.yaml",
    ignoreUndocumented: true,
  })
);

//Debug middleware
app.use(debugMiddleware);

// API routers
app.use("/user", userRouter);
app.use("/signatures", signatureRouter);
app.use("/folders", folderRouter);

// OpenApi validator
app.use(openApiValidatorMiddleware);

// Global error handler
app.use(globalErrorHandler);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export default app;
