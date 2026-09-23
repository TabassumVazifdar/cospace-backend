import { z } from "zod";

// Schema for validating the payload of a "create booking" request.
// - desk: trimmed string, 3-100 chars.
// - floor: trimmed string, 5-200 chars.
// - date: a valid ISO date string (e.g. "2025-01-01").
// - active: optional boolean, defaults to true when omitted.

export const createBookingSchema = z.object({
  desk: z.string().trim().min(3).max(100),
  floor: z.string().trim().min(5).max(200),
  date: z.iso.date(),
  active: z.boolean().optional().default(true),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
