import z from "zod";

export const createAdminValidator = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Email is not Valid"),

    password: z
      .string()
      .min(6, "Password is required and must have 12 characters"),
  }),
});
