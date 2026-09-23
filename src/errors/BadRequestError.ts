import { AppError } from "../utils/appError";
import HTTP_STATUS from "../constants/httpStatus";

// 400 — the client sent a malformed or invalid request.
export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, HTTP_STATUS.BAD_REQUEST);
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
