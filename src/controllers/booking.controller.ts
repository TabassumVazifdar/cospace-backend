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

  getAll = (req: Request, res: Response): void => {
    try {
      const { page, limit } = req.query;

      // req.query values are strings (or arrays of strings) by default, so
      // convert to numbers explicitly and fall back to sane defaults when
      // the param is missing or not a valid number.
      const parsedPage = parseInt(page as string, 10);
      const parsedLimit = parseInt(limit as string, 10);

      const requestedPage = page !== undefined && !Number.isNaN(parsedPage) ? parsedPage : 1;
      const requestedLimit = limit !== undefined && !Number.isNaN(parsedLimit) ? parsedLimit : 10;

      // Enforce minimum bounds so a client-supplied page/limit of 0 or a
      // negative number can never reach the service and produce a
      // negative skip offset that breaks the pagination slice.
      const safePage = Math.max(1, requestedPage);
      const safeLimit = Math.min(Math.max(1, requestedLimit), 50);

      const result = this.service.getPaginatedShifts(safePage, safeLimit);
      res.status(200).json(result);
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
