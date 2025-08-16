import { z } from "zod";

export const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  questionTime: z.date().optional(),
  answerTime: z.date().optional(),
});

export const questionTextSchema = questionSchema.pick({
  question: true,
});

export const createQuestionSchema = questionSchema;

export const updateQuestionSchema = questionSchema.partial();

export type Question = z.infer<typeof questionSchema>;
export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
