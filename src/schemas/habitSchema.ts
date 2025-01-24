import z from "zod";

export const habitSchema = z.object({
  title: z
    .string({ message: "The title is required" })
    .min(3, { message: "The title must have at least 3 characters" })
    .max(120, { message: "The title can't exceed 120 characters" })
    .regex(/^[a-zA-Z0-9\s.,&]+$/, {
      message: "The title contains invalid characters",
    })
    .trim(),
  state: z.boolean({ message: "The state is required" }),
  goalId: z.string({ message: "The goal ID is required" }),
  goalPerWeek: z
    .number({ message: "The goal per week is required" })
    .min(1, { message: "The goal per week must be at least 1" }),
  completed: z
    .number({ message: "The completed count is required" })
    .min(0, { message: "The completed count cannot be negative" }),
  days: z.string({ message: "The days are required" }),
});
