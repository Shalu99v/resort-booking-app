import { Request, Response } from "express";
import Booking from "../models/booking.model";

export const createBooking = async (req: Request, res: Response) => {
  try {
    // Business-level validation: check that checkOut > checkIn
    const { checkIn, checkOut } = req.body;
    if (new Date(checkOut) <= new Date(checkIn)) {
      return res.status(400).json({ message: "Check-out date must be after check-in date" });
    }

    const booking = await Booking.create(req.body);
    return res.status(201).json(booking);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      const errors: Record<string, string> = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: "Validation failed", errors });
    }
    console.error("createBooking error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getBookings = async (_req: Request, res: Response) => {
  try {
    const all = await Booking.find().sort({ createdAt: -1 }).lean();
    return res.json(all);
  } catch (err: any) {
    console.error("getBookings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).lean();
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    return res.json(booking);
  } catch (err: any) {
    console.error("getBooking error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    return res.json(updated);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      const errors: Record<string, string> = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: "Validation failed", errors });
    }
    console.error("updateBooking error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const removed = await Booking.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Booking not found" });
    return res.json({ message: "Booking deleted" });
  } catch (err: any) {
    console.error("deleteBooking error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
