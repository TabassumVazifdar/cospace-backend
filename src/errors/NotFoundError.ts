import { AppError } from "../utils/appError";
import HTTP_STATUS from "../constants/httpStatus";
// 404 — the requested resource does not exist.
export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, HTTP_STATUS.NOT_FOUND);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
