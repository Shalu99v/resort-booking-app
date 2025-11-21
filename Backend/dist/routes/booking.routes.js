"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const booking_controller_1 = require("../controllers/booking.controller");
const validateRequest_1 = require("../middlewares/validateRequest");
const router = (0, express_1.Router)();
// Validation chain for create/update
const bookingValidation = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("Invalid email address").normalizeEmail(),
    (0, express_validator_1.body)("phone")
        .trim()
        .matches(/^[0-9]{10}$/)
        .withMessage("Phone number must be exactly 10 digits"),
    (0, express_validator_1.body)("roomType")
        .trim()
        .isIn(["Standard", "Deluxe", "Suite"])
        .withMessage("Invalid room type"),
    (0, express_validator_1.body)("checkIn").isISO8601().withMessage("Check-in must be a valid date"),
    (0, express_validator_1.body)("checkOut").isISO8601().withMessage("Check-out must be a valid date"),
    (0, express_validator_1.body)("guests").isInt({ min: 1, max: 20 }).withMessage("Guests must be between 1 and 20"),
    (0, express_validator_1.body)("specialRequest").optional().trim().escape().isLength({ max: 500 }).withMessage("Too long"),
];
// Routes
router.post("/", bookingValidation, validateRequest_1.validateRequest, booking_controller_1.createBooking);
router.get("/", booking_controller_1.getBookings);
router.get("/:id", (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid id"), validateRequest_1.validateRequest, booking_controller_1.getBooking);
router.put("/:id", (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid id"), bookingValidation, validateRequest_1.validateRequest, booking_controller_1.updateBooking);
router.delete("/:id", (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid id"), validateRequest_1.validateRequest, booking_controller_1.deleteBooking);
exports.default = router;
