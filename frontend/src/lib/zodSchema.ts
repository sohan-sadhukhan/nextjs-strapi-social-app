import z from "zod";

export const profileBioSchema = z.object({
  bio: z
    .string()
    .max(160, "Bio must be 160 characters or fewer")
    .optional()
    .or(z.literal("")),
});

export const profileNameSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be 50 characters or fewer")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    ),
});

export const postDescriptionSchema = z.object({
  description: z
    .string()
    .min(1, "Description can't be empty")
    .max(500, "Description is too long")
    .optional(),
});

export const commentSchema = z.object({
  comment: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment is too long"),
});

export const personalInfoSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  email: z.email("Please enter a valid email address"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters")
      .max(32, "Current password must be at most 32 characters"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),

    confirmNewPassword: z
      .string()
      .min(8, "Please confirm your new password")
      .max(32, "Password must be at most 32 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const deleteAccountSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});
