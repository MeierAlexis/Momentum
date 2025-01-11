import z from "zod";
import { habitSchema } from "../schemas/habitSchema.ts";

export const validateHabit = (req, res, next) => {
  try {
    // Validate the request body with zod
    habitSchema.parse(req.body);
    next(); //if it is valid, go to the next
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
        sucess: false,
        message: "Validation of Habit failed",
      });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
