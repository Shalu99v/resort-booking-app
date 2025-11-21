"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const db_1 = require("./config/db");
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
// --- CORS MUST COME FIRST ---
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// Security
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: "10kb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// --- RATE LIMIT ---
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);
// --- ROUTES ---
app.use("/bookings", booking_routes_1.default);
// Health check
app.get("/", (_, res) => res.send("API running"));
// --- SECURITY SANITIZATION (MUST BE AFTER ROUTES) ---
app.use((0, express_mongo_sanitize_1.default)({
    replaceWith: "_",
}));
app.use((0, xss_clean_1.default)());
// --- GLOBAL ERROR HANDLER ---
app.use(errorHandler_1.errorHandler);
// --- START SERVER ---
const PORT = process.env.PORT || 4000;
(0, db_1.connectDB)().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
