"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.getBooking = exports.getBookings = exports.createBooking = void 0;
const booking_model_1 = __importDefault(require("../models/booking.model"));
const createBooking = async (req, res) => {
    try {
        // Business-level validation: check that checkOut > checkIn
        const { checkIn, checkOut } = req.body;
        if (new Date(checkOut) <= new Date(checkIn)) {
            return res.status(400).json({ message: "Check-out date must be after check-in date" });
        }
        const booking = await booking_model_1.default.create(req.body);
        return res.status(201).json(booking);
    }
    catch (err) {
        if (err.name === "ValidationError") {
            const errors = {};
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            return res.status(400).json({ message: "Validation failed", errors });
        }
        console.error("createBooking error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.createBooking = createBooking;
const getBookings = async (_req, res) => {
    try {
        const all = await booking_model_1.default.find().sort({ createdAt: -1 }).lean();
        return res.json(all);
    }
    catch (err) {
        console.error("getBookings error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.getBookings = getBookings;
const getBooking = async (req, res) => {
    try {
        const booking = await booking_model_1.default.findById(req.params.id).lean();
        if (!booking)
            return res.status(404).json({ message: "Booking not found" });
        return res.json(booking);
    }
    catch (err) {
        console.error("getBooking error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.getBooking = getBooking;
const updateBooking = async (req, res) => {
    try {
        const updated = await booking_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).lean();
        if (!updated)
            return res.status(404).json({ message: "Booking not found" });
        return res.json(updated);
    }
    catch (err) {
        if (err.name === "ValidationError") {
            const errors = {};
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            return res.status(400).json({ message: "Validation failed", errors });
        }
        console.error("updateBooking error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (req, res) => {
    try {
        const removed = await booking_model_1.default.findByIdAndDelete(req.params.id);
        if (!removed)
            return res.status(404).json({ message: "Booking not found" });
        return res.json({ message: "Booking deleted" });
    }
    catch (err) {
        console.error("deleteBooking error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.deleteBooking = deleteBooking;
