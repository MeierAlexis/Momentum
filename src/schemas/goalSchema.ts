import z from "zod";

export const goalSchema = z.object({
  title: z
    .string({ message: "The title is required" })
    .min(3, { message: "The title must have at least 3 characters" })
    .max(120, { message: "The title can't exceed 120 characters" })
    .regex(/^[a-zA-Z0-9\s.,&]+$/, {
      message: "The title contains invalid characters",
    })
    .trim(),
  description: z
    .string({ message: "The description is required" })
    .min(3, { message: "The description must have at least 3 characters" })
    .max(255, { message: "The description can't exceed 255 characters" })
    .regex(/^[a-zA-Z0-9\s.,&]+$/, {
      message: "The description contains invalid characters",
    }),
  start_date: z
    .string({ message: "The start date is required" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "The start date must be a valid date",
    }),
  end_date: z
    .string({ message: "The end date is required" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "The end date must be a valid date",
    })
    .nullable(), // Accept null
});
