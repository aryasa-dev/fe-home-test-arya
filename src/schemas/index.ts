import z from "zod";

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

export const registerSchema = z.object({
  username: z.string({error: "Username field cannot be empty"}),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" }),
  role: z.enum(["User", "Admin"], { error: "Role field is required" }),
});

export const loginSchema = z.object({
  username: z.string({ error: "Please enter your username" }),
  password: z.string({ error: "Please enter your password" }),
});

export const createArticleSchema = z.object({
  thumbnail: z
    .instanceof(File, { message: "Please enter picture" })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Only JPG, JPEG or PNG image files are allowed.",
    }).nullable(),
  title: z.string({ error: "Please enter title" }),
  category: z.string({ error: "Please select category" }),
  content: z
    .string()
    .min(1, "Content field cannot be empty")
    .refine(
      (val) => {
        const stripped = val.replace(/<[^>]*>?/gm, "").trim();
        return stripped.length > 0;
      },
      {
        message: "Content field cannot be empty",
      }
    ),
});

export const editArticleSchema = z.object({
  thumbnail: z
    .instanceof(File, { message: "Please enter picture" })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Only JPG, JPEG or PNG image files are allowed.",
    }).nullable(),
  title: z.string({ error: "Please enter title" }),
  categoryId: z.string({ error: "Please select category" }),
  content: z
    .string()
    .min(1, "Content field cannot be empty")
    .refine(
      (val) => {
        const stripped = val.replace(/<[^>]*>?/gm, "").trim();
        return stripped.length > 0;
      },
      {
        message: "Content field cannot be empty",
      }
    ),
});

export const createCategory = z.object({
  name: z.string().min(1, {error: "Category field cannot be empty"})
})

export const editCategory = z.object({
  name: z.string().min(1, {error: "Category field cannot be empty"})
})