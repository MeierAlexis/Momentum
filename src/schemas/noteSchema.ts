import z from "zod";

export const noteSchema = z.object({
  title: z
    .string({ message: "The title is required" })
    .min(3, { message: "The title must have at least 3 characters" })
    .max(120, { message: "The title can't exceed 120 characters" })
    .trim(),
  note: z
    .string({ message: "The note is required" })
    .max(255, { message: "The note can't exceed 255 characters" }),
  date: z.string({ message: "The date is required" }).nullable(), // Accept null
});
