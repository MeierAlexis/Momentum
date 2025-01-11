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
  frequency: z
    .string({ message: "The frequency is required" })
    .min(3, { message: "The frequency must have at least 3 characters" })
    .max(120, { message: "The frequency can't exceed 120 characters" })
    .regex(/^[a-zA-Z0-9\s.,&]+$/, {
      message: "The frequency contains invalid characters",
    })
    .trim(),
});
