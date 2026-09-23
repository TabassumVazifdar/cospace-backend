// Custom error classes let the service layer signal *why* something failed
// without knowing about HTTP at all. The global errorHandler middleware is
// the only place that translates these into HTTP status codes.
import { AppError } from "../utils/appError";
import HTTP_STATUS from "../constants/httpStatus";

export { BadRequestError } from "./BadRequestError";
export { UnauthorizedError } from "./UnauthorizedError";
export { ForbiddenError } from "./ForbiddenError";
export { NotFoundError } from "./NotFoundError";

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, HTTP_STATUS.BAD_REQUEST);
    this.name = "ValidationError";
  }
}
