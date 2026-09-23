import { Booking } from "../models/booking.model";
import { BookingInput, BookingRepository } from "../repositories/booking.repository";
import { NotFoundError, ValidationError } from "../errors";

function validateBookingInput(data: Partial<BookingInput>): void {
  const { desk, floor, date, active } = data;

  if (!desk || floor === undefined || !date || active === undefined) {
    throw new ValidationError("desk, floor, date, and active are all required");
  }
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class BookingService {
  private repository = new BookingRepository();

  findAll(): Booking[] {
    return this.repository.findAll();
  }

  findById(id: string): Booking {
    const booking = this.repository.findById(id);

    if (!booking) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }

    return booking;
  }

  create(data: Partial<BookingInput>): Booking {
    validateBookingInput(data);

    return this.repository.create(data as BookingInput);
  }

  replace(id: string, data: Partial<BookingInput>): Booking {
    if (!this.repository.findById(id)) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }

    validateBookingInput(data);

    const updated = this.repository.update(id, data as BookingInput);

    // Can't happen after the findById check above, but keeps TypeScript
    // and future refactors honest about the return type.
    if (!updated) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }

    return updated;
  }

  toggleActive(id: string): Booking {
    const booking = this.repository.findById(id);

    if (!booking) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }

    return this.repository.update(id, { active: !booking.active }) as Booking;
  }

  delete(id: string): void {
    const deleted = this.repository.delete(id);

    if (!deleted) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }
  }

  // Returns a page of bookings alongside pagination metadata. `page` is
  // 1-based; both `page` and `limit` are clamped to sane minimums so
  // callers passing 0/negative values don't produce a bad skip offset.
  getPaginatedShifts(page: number, limit: number): PaginatedResult<Booking> {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const skip = (safePage - 1) * safeLimit;

    const total = this.repository.count();
    const data = this.repository.findPaginated(skip, safeLimit);
    const totalPages = Math.ceil(total / safeLimit);

    return {
      data,
      meta: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages,
      },
    };
  }
}
