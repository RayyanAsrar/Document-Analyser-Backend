import { Request, Response } from "express";
import validate from "@/utils/validation";
import { fileSchema } from "@/schemas/file.schema";
import { APIResponse } from "@/utils/response";
import CustomError from "http-errors";
import { extractPDF } from "@/utils/pdfExtractor";
import { downloadFileFromS3 } from "@/utils/s3";
import { getSummaryPrompt } from "@/utils/prompt";
import * as GeminiService from "@/services/gemini.service";
import File from "@/models/file.model";
import Chat from "@/models/chat.model";

const fileController = {
  async processFile(req: Request, res: Response) {
    const { id } = req.user;
    const { data, error, success } = validate(fileSchema, req.body);

    if (!success) {
      const message = error.issues?.[0]?.message || "Validation failed";
      throw CustomError(400, message);
    }
    const fileBuffer = await downloadFileFromS3(req.body.key);

    const pdfData = await extractPDF({
      fileBuffer,
      contentType: req.body.contentType,
    });

    const prompt = getSummaryPrompt(pdfData.text);

    const response = await GeminiService.getGeminiResponse(prompt);

    const fileData = {
      ...data,
      extractedText: pdfData.text,
      userID: id,
      summary: response,
    };

    const file = await File.create(fileData);

    if(!file) {
        throw CustomError(400, "File not Uploaded")
    }

    const chatData = {
      userID: id,
      isDeleted: false,
      isArchived: false,
      fileID: file._id,
    };

    const chat = await Chat.create(chatData);

    if(!chat) {
        throw CustomError(400, "Chat not Initialized")
    }

    return res.status(200).send(
      new APIResponse("File Processed SuccessFully", {
        file,
        chat,
      })
    );
  },
};

export default fileController;
