import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return clean errors
    const extracted: Record<string, string> = {};
    errors.array().forEach((err, index) => {
      const e: any = err;
      const key = typeof e.param === "string" ? e.param : `error_${index}`;
      extracted[key] = String(e.msg);
    });
    return res.status(400).json({ message: "Validation failed", errors: extracted });
  }
  return next();
};
