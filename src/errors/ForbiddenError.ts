import { AppError } from "../utils/appError";
import HTTP_STATUS from "../constants/httpStatus";
// 403 — the client is authenticated but not allowed to access the resource.
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, HTTP_STATUS.FORBIDDEN);
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
