import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "@/config/database";
import errorHandler from "@/middlewares/error.middleware";
import {
  authRouter,
  uploadRouter,
  userRouter,
  fileRouter,
  chatRouter,
  questionsRouter,
} from "@/routes";
import { APIResponse } from "@/utils/response";

const app = express();

connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("combined")); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Test endpoint
app.get("/", (req, res) => {
  res.json(new APIResponse("Document Analyser is Successfully Running."));
});

// Health check endpoint
app.get("/health", (req, res) => {
  const data = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
  res.json(new APIResponse("API Running Good", data));
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/file", fileRouter);
app.use("/api/chat", chatRouter);
app.use("/api/question", questionsRouter);

//Global Error handler
app.use(errorHandler);

export default app;
