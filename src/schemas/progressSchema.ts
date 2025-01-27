import z from "zod";

export const progressSchema = z.object({
  id: z.string({ message: "The goal ID is required" }),
  id_goal: z.string({ message: "The habit ID is required" }),
  date: z.string({ message: "The date is required" }),
  progress: z.number({ message: "The progress is required" }),
});
