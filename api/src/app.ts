import express from "express";
import { Request, Response } from "express";

import { metricsMiddleware, metricsRouter } from "./metrics";
const { createLogger, format } = require("winston");
const LokiTransport = require("winston-loki");

const app = express();

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new LokiTransport({
      host: "http://host.docker.internal:3100",
      labels: { job: "express-api" },
      json: true,
      onConnectionError: (err: any) =>
        console.error("Loki connection error:", err),
    }),
  ],
});

app.use(metricsMiddleware);
app.use(express.json());

app.use(metricsRouter);

app.get("/", (req: Request, res: Response) => {
  logger.info("hello world");
  res.send("Hello, World!");
});

app.get("/latency/fast", (req: Request, res: Response) => {
  logger.info("fast response");
  res.send("Fast response");
});

app.get("/latency/medium", (req: Request, res: Response) => {
  setTimeout(() => {
    logger.info("medium response");
    res.send("Medium response");
  }, 1000);
});

app.get("/latency/slow", (req: Request, res: Response) => {
  setTimeout(() => {
    logger.info("slow response");
    res.send("Slow response");
  }, 3000);
});

app.get("/logs/info", (req: Request, res: Response) => {
  logger.info("This is an info log");
  res.send("Info log recorded");
});

app.get("/logs/warn", (req: Request, res: Response) => {
  logger.warn("This is a warning log");
  res.send("Warning log recorded");
});

app.get("/logs/error", (req: Request, res: Response) => {
  logger.error("This is an error log");
  res.send("Error log recorded");
});

app.use((err: any, req: any, res: any, next: any) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
