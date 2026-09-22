import { Booking } from "../models/booking.model";

// Data used to create or replace a booking; the id is generated/preserved
// by the repository rather than supplied by the caller.
export type BookingInput = Omit<Booking, "id">;

export class BookingRepository {
  private bookings: Booking[] = [
    { id: "1", desk: "A12", floor: 1, date: "2026-09-22", active: true },
    { id: "2", desk: "B04", floor: 2, date: "2026-09-23", active: true },
    { id: "3", desk: "C07", floor: 3, date: "2026-09-24", active: false },
  ];

  findAll(): Booking[] {
    return this.bookings;
  }

  findById(id: string): Booking | undefined {
    return this.bookings.find((b) => b.id === id);
  }

  create(booking: BookingInput): Booking {
    const nextId =
      this.bookings.length > 0
        ? (Math.max(...this.bookings.map((b) => Number(b.id))) + 1).toString()
        : "1";

    const newBooking: Booking = { id: nextId, ...booking };
    this.bookings.push(newBooking);

    return newBooking;
  }

  update(id: string, data: Partial<BookingInput>): Booking | undefined {
    const booking = this.findById(id);

    if (!booking) {
      return undefined;
    }

    Object.assign(booking, data);

    return booking;
  }

  delete(id: string): boolean {
    const index = this.bookings.findIndex((b) => b.id === id);

    if (index === -1) {
      return false;
    }

    this.bookings.splice(index, 1);

    return true;
  }
}
