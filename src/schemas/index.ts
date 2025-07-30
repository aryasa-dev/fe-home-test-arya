import z from "zod";

export const registerSchema = z.object({
  username: z.string().nonempty("Username field cannot be empty"),
  password: z
    .string().min(8, {error: "Password must be at least 8 characters long"}),
  role: z.enum(["User", "Admin"], {error: "Role field is required"}),
});

export const loginSchema = z.object({
  username: z.string().nonempty("Please enter your username"),
  password: z.string().nonempty("Please enter your password"),
});
