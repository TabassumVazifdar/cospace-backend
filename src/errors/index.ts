// Custom error classes let the service layer signal *why* something failed
// without knowing about HTTP at all. The controller is the only place that
// translates these into status codes.
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
