import z from "zod";
import { noteSchema } from "../schemas/noteSchema.ts";

export const validateNote = (req, res, next) => {
  try {
    // Validate the request body with zod
    noteSchema.parse(req.body);
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
