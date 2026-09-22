import { NextFunction, Request, Response } from "express";

// Logs every incoming request's method, URL, and timestamp, then calls
// next() to hand control back to Express so the request keeps moving
// through the rest of the middleware/route chain. Without calling next(),
// Express would never dispatch the request to the matching route handler
// and the client's connection would hang until it times out.
export function logger(req: Request, _res: Response, next: NextFunction): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}
