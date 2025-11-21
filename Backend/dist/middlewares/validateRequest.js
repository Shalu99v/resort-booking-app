"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // return clean errors
        const extracted = {};
        errors.array().forEach((err, index) => {
            const e = err;
            const key = typeof e.param === "string" ? e.param : `error_${index}`;
            extracted[key] = String(e.msg);
        });
        return res.status(400).json({ message: "Validation failed", errors: extracted });
    }
    return next();
};
exports.validateRequest = validateRequest;
