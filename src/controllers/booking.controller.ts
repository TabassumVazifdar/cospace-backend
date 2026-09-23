import { ParamsDictionary, Request, Response } from "express-serve-static-core";
import { BookingService } from "../services/booking.service";
import { BookingInput } from "../repositories/booking.repository";
import { NotFoundError, ValidationError } from "../errors";

// Extends ParamsDictionary (which carries an index signature) so this type
// stays structurally compatible with plain RequestHandler/Request params —
// needed when combined with other untyped middleware (e.g. auth, validate)
// in the same route registration.
export interface BookingIdParams extends ParamsDictionary {
  id: string;
}

export class BookingController {
  private service = new BookingService();

  // Central place to translate a caught error into an HTTP response.
  // Keeps every handler below free of repeated try/catch boilerplate logic.
  private handleError(error: unknown, res: Response): void {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }

    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }

    // Anything unexpected is a genuine server-side bug, not a client mistake.
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }

  getAll = (_req: Request, res: Response) => {
    try {
      const bookings = this.service.findAll();
      res.status(200).json(bookings);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getById = (req: Request<BookingIdParams>, res: Response): void => {
    try {
      const booking = this.service.findById(req.params.id);
      res.status(200).json(booking);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  create = (req: Request, res: Response): void => {
    try {
      const booking = this.service.create(req.body as Partial<BookingInput>);
      res.status(201).json(booking);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  replace = (req: Request<BookingIdParams>, res: Response): void => {
    try {
      const booking = this.service.replace(req.params.id, req.body as Partial<BookingInput>);
      res.status(200).json(booking);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  toggleActive = (req: Request<BookingIdParams>, res: Response): void => {
    try {
      const booking = this.service.toggleActive(req.params.id);
      res.status(200).json(booking);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  delete = (req: Request<BookingIdParams>, res: Response): void => {
    try {
      this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
