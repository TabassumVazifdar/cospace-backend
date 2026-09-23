import { NextFunction, Request, Response } from "express";
//import { ZodSchema as z, ZodError } from "zod/v3";
import { RequestHandler } from "express";
import { ZodSchema, z } from "zod";


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

// Generic middleware generator: takes any Zod schema and returns Express
// middleware that parses req.body against it. On success, req.body is
// replaced with the parsed (and, e.g., trimmed/defaulted) data and next()
// is called. On failure, responds 400 with the Zod validation errors.
//   router.post("/", validateSchema(createBookingSchema), controller.create);
// export function validateSchema(schema: ZodSchema) {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const result = schema.safeParse(req.body);

//     if (!result.success) {
//       res.status(400).json({ error: "Validation failed", details: result.error.issues });
//       next();
//       return;
//     }

//     req.body = result.data;
//     next();
//   };
// }

export const validateSchema = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
    
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: "Validation failed",
                    errors: error.issues,
                });
                return;
            }
 
            next(error);
        }
    };
};