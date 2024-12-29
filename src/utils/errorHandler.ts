import { AppError } from "../types/appError";

export const errorHandler = (
  err: unknown,
  defaultMessage?: string,
  defaultStatusCode?: number
) => {
  if (err instanceof AppError) {
    return err;
  }

  if (err instanceof Error) {
    return new AppError(err.message, defaultStatusCode);
  }

  return new AppError(
    defaultMessage ?? "An error has occurred",
    defaultStatusCode
  );
};
