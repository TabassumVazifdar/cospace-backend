import express from "express";

const app = express();
const PORT = 5000;

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
