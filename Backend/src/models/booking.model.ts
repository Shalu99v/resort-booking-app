import mongoose, { Document } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequest?: string;
  status?: string;
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },
    roomType: {
      type: String,
      required: [true, "Room type is required"],
      enum: ["Standard", "Deluxe", "Suite"],
    },
    checkIn: {
      type: String,
      required: [true, "Check-in date is required"],
    },
    checkOut: {
      type: String,
      required: [true, "Check-out date is required"],
    },
    guests: {
      type: Number,
      required: [true, "Guests count is required"],
      min: [1, "At least 1 guest required"],
      max: [20, "Guests too many"],
    },
    specialRequest: {
      type: String,
      trim: true,
      maxlength: [500, "Special request too long"],
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", bookingSchema);
