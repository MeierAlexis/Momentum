import { registerSchema, loginSchema } from "../schemas/authSchema.ts";

import z from "zod";

export const validateRegister = (req, res, next) => {
  try {
    // Validate the request body with zod
    registerSchema.parse(req.body);
    next(); //if it is valid, go to the next
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
        sucess: false,
        message: "Validation of register failed",
      });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const validateLogin = (req, res, next) => {
  try {
    //validate body request
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
        success: false,
        message: "Validation of Login failed",
      });
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};
