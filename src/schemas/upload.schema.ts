import {z} from "zod";

export const uploadUrlSchema = z.object({
    fileName: z.string(),
    contentType: z.string()
});

export const downloadUrlSchema = z.object({
    key: z.string()
})