import { Router } from "express";
import { BookingController, BookingIdParams } from "../controllers/booking.controller";
import { auth } from "../middleware/auth";
import { validate, validateSchema } from "../middleware/validate";
import { Booking, createBookingSchema } from "../schemas/booking.schema";
import { Request, Response } from "express";

const router = Router();
const bookingController = new BookingController();

// GET routes stay public — no auth required to read bookings.
router.get("/", bookingController.getAll);
router.get<BookingIdParams>("/:id", bookingController.getById);

// Mutating routes require auth; POST/PUT additionally validate the payload.
//router.post("/", auth, validate(["desk", "floor", "date", "active"]), bookingController.create);
router.post(
    "/",
    auth,
    validateSchema(createBookingSchema),
    (req: Request<{}, {}, Booking>, res: Response) => bookingController.create(req, res),
);

router.put<BookingIdParams>("/:id", auth, validate(["desk", "floor", "date", "active"]), bookingController.replace);
router.patch<BookingIdParams>("/:id", auth, bookingController.toggleActive);
router.delete<BookingIdParams>("/:id", auth, bookingController.delete);

export default router;
