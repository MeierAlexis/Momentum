import z from "zod";
import { progressSchema } from "../schemas/progressSchema.ts";

export const validateProgress = (req, res, next) => {
  try {
    progressSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
        sucess: false,
        message: "Validation of Habit failed",
      });
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
