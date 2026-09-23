import { NextFunction, Request, Response } from "express";
import HTTP_STATUS from "../constants/httpStatus";

const VALID_TOKEN = "super-secret-key";

// Checks the Authorization header against a hardcoded token. Calls next()
// to let the request continue only when the token matches; otherwise it
// ends the request itself with a 401, so no further middleware/route runs.
export function auth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers["authorization"];

  if (token !== VALID_TOKEN) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Unauthorized" });
    return;
  }

  next();
}
