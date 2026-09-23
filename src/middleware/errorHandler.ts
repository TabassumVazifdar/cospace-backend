import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod/v3";
import { AppError } from "../utils/appError";
import HTTP_STATUS from "../constants/httpStatus";

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
  if (err instanceof ZodError) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Validation failed", details: err.issues });
    return;
  }

  // Operational AppErrors are anticipated failures (bad input, missing
  // resource, etc.) — safe to expose their status/message directly to
  // the client, no need to log or treat as a server-side bug.
  if (err instanceof AppError && err.isOperational) {
    res.status(err.statusCode).json({ status: err.status, message: err.message });
    return;
  }

  // Anything else is unexpected — log the full stack for debugging, but
  // never leak internals to the client; always respond with a generic 500.
  console.error(err.stack ?? err.message);
  return 
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong on our end",
    //res.status(500).json({ error: "Internal server error" });
  });
}

