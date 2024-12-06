import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as OpenApiValidator from "express-openapi-validator";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

//Import the routers
import userRouter from "./routers/user.routers";

//Debug
import { debugMiddleware } from "./middlewares/debug.middleware";
import { openApiValidatorMiddleware } from "./middlewares/openapi.middleware";
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
app.use("/users", userRouter);

// OpenApi validator
app.use(openApiValidatorMiddleware);

app.use((err: AppError, req: Request, res: Response) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export default app;
