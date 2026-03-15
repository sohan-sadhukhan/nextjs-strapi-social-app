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
