import z from "zod";
import { goalSchema } from "../schemas/goalSchema.ts";

export const validationGoal = (req, res, next) => {
  try {
    goalSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Goal Validation went wrong",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong with goal authentication",
    });
  }
};
