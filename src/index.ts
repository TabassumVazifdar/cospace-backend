import express from "express";
import { bookings, Booking } from "./routes/booking";
import bookingRouter from "./routes/booking";

const app = express();
const PORT = 5000;

// Parse JSON request bodies so req.body is populated on POST/PUT/PATCH requests.
app.use(express.json());
app.use('/bookings', bookingRouter)
app.get("/", (_req: express.Request, res: express.Response) => {
  res.status(200).json({ status: "active", message: "CoSpace API is running" });
});



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
