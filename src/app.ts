import express from "express";
import authRoutes from "./routes/auth.routes.ts";
import cookieParser from "cookie-parser";
import goalsRoutes from "./routes/goals.routes.ts";
import cors from "cors";

const app = express();

app.use(cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);
app.use("/api", goalsRoutes);
export default app;
