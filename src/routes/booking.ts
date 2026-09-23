import express, { Request, Response, Router } from "express";
import HTTP_STATUS from "../constants/httpStatus"; 
const router = Router();



export interface Booking {
  id: string;
  desk: string;
  floor: number;
  date: string;
  active: boolean;
}

export const bookings: Booking[] = [
  { id: "1", desk: "A12", floor: 1, date: "2026-09-22", active: true },
  { id: "2", desk: "B04", floor: 2, date: "2026-09-23", active: true },
  { id: "3", desk: "C07", floor: 3, date: "2026-09-24", active: false },
];

// req.params.id is always a string (Express's ParamsDictionary), so route
// params are typed explicitly as `BookingIdParams` and compared directly
// against `booking.id` (also a string) — no Number() conversion, which
// previously risked a silent "1" !== 1 mismatch.
interface BookingIdParams {
  id: string;
}




// GET /bookings - return the whole in-memory bookings array.
router.get("/bookings", (_req: express.Request, res: express.Response) => {
  res.status(HTTP_STATUS.OK).json(bookings);
});

// GET /bookings/:id - find a single booking by its ID (path parameter).
router.get("/bookings/:id", (req: Request<BookingIdParams>, res: Response) => {
  const { id } = req.params;

  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Booking not found" });
  }

  res.status(HTTP_STATUS.OK).json(booking);
});

// POST /bookings - add a new booking using the JSON payload in the request body.
router.post("/bookings", (req: express.Request, res: express.Response) => {
  const { desk, floor, date, active } = req.body as Partial<Booking>;

  if (!desk || floor === undefined || !date || active === undefined) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "desk, floor, date, and active are all required",
    });
  }

  const nextId =
    bookings.length > 0
      ? (Math.max(...bookings.map((b) => Number(b.id))) + 1).toString()
      : "1";

  const newBooking: Booking = {
    id: nextId,
    desk,
    floor,
    date,
    active,
  };

  bookings.push(newBooking);

  res.status(HTTP_STATUS.CREATED).json(newBooking);
});

// PUT /bookings/:id - replace the whole booking object (except id, which is preserved).
router.put("/bookings/:id", (req: Request<BookingIdParams>, res: Response) => {
  const { id } = req.params;

  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Booking not found" });
  }

  const { desk, floor, date, active } = req.body as Partial<Booking>;

  if (!desk || floor === undefined || !date || active === undefined) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "desk, floor, date, and active are all required",
    });
  }

  const updatedBooking: Booking = { id, desk, floor, date, active };
  bookings[index] = updatedBooking;

  res.status(HTTP_STATUS.OK).json(updatedBooking);
});

// PATCH /bookings/:id - only flip the active status, leaving other fields untouched.
router.patch("/bookings/:id", (req: Request<BookingIdParams>, res: Response) => {
  const { id } = req.params;

  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Booking not found" });
  }

  booking.active = !booking.active;

  res.status(HTTP_STATUS.OK).json(booking);
});

// DELETE /bookings/:id - remove the booking from the array.
router.delete("/bookings/:id", (req: Request<BookingIdParams>, res: Response) => {
  const { id } = req.params;

  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Booking not found" });
  }

  bookings.splice(index, 1);

  res.status(HTTP_STATUS.NO_CONTENT).send();
});
export default router;
