import z from "zod";

export const progressSchema = z.object({
  id_goal: z.string({ message: "The habit ID is required" }),

  progress: z.number({ message: "The progress is required" }),
});
