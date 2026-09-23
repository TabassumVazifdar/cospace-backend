import { Booking } from "../models/booking.model";
import { BookingInput, BookingRepository } from "../repositories/booking.repository";
import { NotFoundError, ValidationError } from "../errors";

function validateBookingInput(data: Partial<BookingInput>): void {
  const { desk, floor, date, active } = data;

  if (!desk || floor === undefined || !date || active === undefined) {
    throw new ValidationError("desk, floor, date, and active are all required");
  }
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
}
