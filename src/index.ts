import express from "express";
import bookingRouter from "./routes/booking.routes";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = 5000;

// Parse JSON request bodies so req.body is populated on POST/PUT/PATCH requests.
app.use(express.json());
app.use(logger);
app.use('/bookings', bookingRouter)
app.get("/", (_req: express.Request, res: express.Response) => {
  res.status(200).json({ status: "active", message: "CoSpace API is running" });
});

// Error handler must be registered last so it catches errors from every
// route/middleware registered above it.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Server is shutting down...");
  process.exit();
});

process.on("SIGTERM", () => {
  console.log("Server is shutting down...");
  process.exit();
});
export default app;
