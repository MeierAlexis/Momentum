import express from "express";
import authRoutes from "./routes/auth.routes.ts";
import cookieParser from "cookie-parser";
import goalsRoutes from "./routes/goals.routes.ts";
import cors from "cors";
import pricesRoutes from "./routes/prices.routes.ts";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api", authRoutes);
app.use("/api", goalsRoutes);
app.use("/api", pricesRoutes);

export default app;
