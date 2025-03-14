import express from "express";
import urlRouter from "./routes/url.routes.js"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use("/", urlRouter);

export default app;


