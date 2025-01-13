import { registerSchema, loginSchema } from "../schemas/authSchema.ts";
import z from "zod";

export const validateRegister = (req, res, next) => {
  try {
    // Validate the request body with zod
    registerSchema.parse(req.body);
    next(); // If it is valid, go to the next middleware
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues.map((issue) => issue.message);
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const validateLogin = (req, res, next) => {
  try {
    console.log(req.body);
    // Validate body request
    loginSchema.parse(req.body);
    next(); // If valid, proceed to the next middleware
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues.map((issue) => issue.message);
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
