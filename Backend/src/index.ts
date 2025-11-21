import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

import { connectDB } from "./config/db";
import bookingRoutes from "./routes/booking.routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

// --- CORS MUST COME FIRST ---
app.use(
  cors({
 origin: [
    "http://localhost:3000",
    "https://resort-booking-app-gamma.vercel.app",  
  ],    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// --- RATE LIMIT ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// --- ROUTES ---
app.use("/bookings", bookingRoutes);

// Health check
app.get("/", (_, res) => res.send("API running"));

// --- SECURITY SANITIZATION (MUST BE AFTER ROUTES) ---
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

app.use(xss());

// --- GLOBAL ERROR HANDLER ---
app.use(errorHandler);

// --- START SERVER ---
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
