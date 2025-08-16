import { z } from "zod";

export const chatSchema = z.object({
  isDeleted: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const updateChatSchema = chatSchema
  .pick({
    isDeleted: true,
    isArchived: true,
  })
  .partial();

export type Chat = z.infer<typeof chatSchema>;
export type UpdateChatInput = z.infer<typeof updateChatSchema>;
