import { z } from "zod";

export const tokenSchema = z.object({
  token: z.string().min(1, "Token ID is required"),
});

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be at most 16 characters"),
  password: z.string().min(6).max(16),
  email: z.string().email("Invalid email format"),
  name: z.string(),
  profileImage: z.string().url("Invalid URL format").optional(),
  provider: z.enum(["google", "credentials"]).default("credentials"),
  role: z.enum(["user", "admin"]).default("user"),
  isDeleted: z.boolean().default(false),
});

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

export type UserSchema = z.infer<typeof userSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
