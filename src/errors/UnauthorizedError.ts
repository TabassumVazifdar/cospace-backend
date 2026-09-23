import { AppError } from "../utils/appError";
import HTTP_STATUS from "../constants/httpStatus";

// 401 — the request lacks valid authentication credentials.
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, HTTP_STATUS.UNAUTHORIZED);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
