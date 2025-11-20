import { Router } from "express";
import { body, param } from "express-validator";
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.controller";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

// Validation chain for create/update
const bookingValidation = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").trim().isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("phone")
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
  body("roomType")
    .trim()
    .isIn(["Standard", "Deluxe", "Suite"])
    .withMessage("Invalid room type"),
  body("checkIn").isISO8601().withMessage("Check-in must be a valid date"),
  body("checkOut").isISO8601().withMessage("Check-out must be a valid date"),
  body("guests").isInt({ min: 1, max: 20 }).withMessage("Guests must be between 1 and 20"),
  body("specialRequest").optional().trim().escape().isLength({ max: 500 }).withMessage("Too long"),
];

// Routes
router.post("/", bookingValidation, validateRequest, createBooking);
router.get("/", getBookings);
router.get("/:id", param("id").isMongoId().withMessage("Invalid id"), validateRequest, getBooking);
router.put("/:id", param("id").isMongoId().withMessage("Invalid id"), bookingValidation, validateRequest, updateBooking);
router.delete("/:id", param("id").isMongoId().withMessage("Invalid id"), validateRequest, deleteBooking);

export default router;
