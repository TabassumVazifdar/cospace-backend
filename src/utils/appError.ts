// A general-purpose operational error carrying an HTTP status code, for use
// anywhere in the app that needs to signal a client- or server-side failure
// with a specific status (complementing the more specific NotFoundError/
// ValidationError in src/errors/index.ts).
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: "fail" | "error";
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    // 4xx errors are the client's fault ("fail"); 5xx are the server's ("error").
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    // Marks this as an anticipated, handled failure rather than a bug, so
    // error-handling middleware can distinguish it from unexpected crashes.
    this.isOperational = true;

    // Excludes this constructor from the captured stack trace so it points
    // to where the error was actually thrown, not to this base class.
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
