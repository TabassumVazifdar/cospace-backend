import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod/v3";

// Express only recognizes a middleware as an error handler if it declares
// exactly four parameters (err, req, res, next), even if `next` is unused.
// It must also be registered last, after all other app.use()/routes, so it
// catches errors passed via next(err) or thrown synchronously in handlers.
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err.stack ?? err.message);
  if (err instanceof ZodError) {
  res.status(400).json({ error: "Validation failed", details: err.issues });
  return;
}

  res.status(500).json({ error: "Internal server error" });
}



