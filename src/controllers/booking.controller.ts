import { NextFunction, ParamsDictionary, Request, Response } from "express-serve-static-core";
import { BookingService } from "../services/booking.service";
import { BookingInput } from "../repositories/booking.repository";
import HTTP_STATUS from "../constants/httpStatus";

// Extends ParamsDictionary (which carries an index signature) so this type
// stays structurally compatible with plain RequestHandler/Request params —
// needed when combined with other untyped middleware (e.g. auth, validate)
// in the same route registration.
export interface BookingIdParams extends ParamsDictionary {
  id: string;
}

export class BookingController {
  private service = new BookingService();

  getAll = (req: Request, res: Response, next: NextFunction): void => {
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
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  getById = (req: Request<BookingIdParams>, res: Response, next: NextFunction): void => {
    try {
      const booking = this.service.findById(req.params.id);
      res.status(HTTP_STATUS.OK).json(booking);
    } catch (error) {
      next(error);
    }
  };

  create = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const booking = this.service.create(req.body as Partial<BookingInput>);
      res.status(HTTP_STATUS.CREATED).json(booking);
    } catch (error) {
      next(error);
    }
  };

  replace = (req: Request<BookingIdParams>, res: Response, next: NextFunction): void => {
    try {
      const booking = this.service.replace(req.params.id, req.body as Partial<BookingInput>);
      res.status(HTTP_STATUS.OK).json(booking);
    } catch (error) {
      next(error);
    }
  };

  toggleActive = (req: Request<BookingIdParams>, res: Response, next: NextFunction): void => {
    try {
      const booking = this.service.toggleActive(req.params.id);
      res.status(HTTP_STATUS.OK).json(booking);
    } catch (error) {
      next(error);
    }
  };

  delete = (req: Request<BookingIdParams>, res: Response, next: NextFunction): void => {
    try {
      this.service.delete(req.params.id);
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };
}
