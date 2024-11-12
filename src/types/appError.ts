export type AppError = Error & {
  status?: number; // Code HTTP de l'erreur
  errors?: Record<string, unknown> | string[] | null; // Détails supplémentaires sur l'erreur
};
