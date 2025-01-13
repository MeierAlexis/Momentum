import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "The name is required" })
      .min(3, { message: "The name must have at least 3 characters long" })
      .max(120, { message: "The name can't have more than 120 characters" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "The name can't contain numbers or special characters",
      }), // Solo letras y espacios
    lastname: z
      .string({ message: "The lastname is required" })
      .min(3, { message: "The lastname must have at least 3 characters long" })
      .max(120, { message: "The lastname can't have more than 120 characters" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "The lastname can't contain numbers or special characters",
      }), // Solo letras y espacios
    username: z
      .string({ message: "The username is required" })
      .min(3, { message: "The username must have at least 3 characters long" })
      .max(120, { message: "The username can't have more than 120 characters" })
      .regex(/^\S+$/, { message: "The username can't have spaces" }), // No espacios
    email: z
      .string({ message: "The email is required" })
      .email({ message: "The email is not valid" }), // Asegura que sea un correo válido
    password: z
      .string({ message: "The password is required" })
      .min(8, { message: "The password must have at least 8 characters long" })
      .max(255, { message: "The password can't have more than 255 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "The password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string({ message: "The confirmation password is required" })
      .min(8, {
        message:
          "The confirmation password must have at least 8 characters long",
      })
      .max(255, {
        message:
          "The confirmation password can't have more than 255 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmpassword"], // Especifica el error en confirmpassword
  });

export const loginSchema = z.object({
  email: z.string({ message: "The email is not correct" }).email().trim(),
  password: z.string({ message: "The password is not correct" }).min(8).trim(),
});
