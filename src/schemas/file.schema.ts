import { z } from "zod";

export const fileSchema = z.object({
  key: z.string().min(1, "Key is required"),
  name: z.string().min(1, "File name is required"),
  size: z.number().positive("File size must be positive"),
  contentType: z
    .string()
    .min(1, "Content type is required")
    .refine(
      (contentType) => contentType === "application/pdf",
      "Only PDF files are supported"
    ),
  isDeleted: z.boolean().default(false),
});

export const updateFileSchema = fileSchema
  .pick({
    name: true,
    isDeleted: true,
  })
  .partial();

export type File = z.infer<typeof fileSchema>;
export type UpdateFileInput = z.infer<typeof updateFileSchema>;
