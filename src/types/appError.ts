export class AppError extends Error {
  public status: number;
  public errors: Record<string, unknown> | string[] | null;

  constructor(
    message: string,
    status: number = 500,
    errors: Record<string, unknown> | string[] | null = null
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
