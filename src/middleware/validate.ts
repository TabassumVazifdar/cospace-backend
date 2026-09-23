import { NextFunction, Request, Response } from "express";

// Higher-order middleware: takes the list of required field names up front
// and returns the actual Express middleware that checks req.body against it.
// This lets each route declare its own required fields, e.g.
//   router.post("/", validate(["desk", "floor", "date", "active"]), controller.create);
export function validate(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const body = (req.body ?? {}) as Record<string, unknown>;

    const missingFields = requiredFields.filter(
      (field) => body[field] === undefined || body[field] === null || body[field] === ""
    );

    if (missingFields.length > 0) {
      res.status(400).json({ error: "Missing required fields", missingFields });
      return;
    }

    next();
  };
}
