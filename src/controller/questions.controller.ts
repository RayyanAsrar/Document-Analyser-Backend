import { Request, Response } from "express";
import CustomError from "http-errors";
import Chat from "../models/chat.model";
import File from "../models/file.model";
import Question from "../models/questions.model";
import {
  questionTextSchema
} from "../schemas/questions.schema";
import { streamGeminiResponse } from "../services/gemini.service";
import { getQuestionPrompt } from "../utils/prompt";
import validate from "../utils/validation";

const questionsController = {
  async askQuestion(req: Request, res: Response) {
    const { id } = req.user;
    const { chatId } = req.params;

    const {
      data: questionData,
      success,
      error,
    } = validate(questionTextSchema, req.body);
    if (!success) {
      throw CustomError(400, error.issues?.[0]?.message || "Validation failed");
    }
    const { question } = questionData;

    // verify chat & file ownership like before...
    const chat = await Chat.findOne({
      _id: chatId,
      userID: id,
      isDeleted: false,
    });
    if (!chat) throw CustomError(404, "Chat not found or access denied");

    const file = await File.findOne({
      _id: chat.fileID,
      userID: id,
      isDeleted: false,
    });
    if (!file?.extractedText) throw CustomError(400, "File text missing");

    const previousQuestions = await Question.find({
      chatID: chatId,
      userID: id,
    })
      .sort({ questionTime: -1 })
      .limit(5)
      .lean();

    const prompt = getQuestionPrompt(
      file.extractedText,
      question,
      previousQuestions
    );

    // setup SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let fullAnswer = "";
    const questionTime = new Date();

    await streamGeminiResponse(prompt, (chunk) => {
      fullAnswer += chunk;
      res.write(`data: ${chunk}\n\n`);
    });

    // When stream finishes → save to DB
    const answerTime = new Date();
    const newQuestion = await Question.create({
      userID: id,
      chatID: chatId,
      question,
      answer: fullAnswer,
      questionTime,
      answerTime,
    });

    // Send closing event
    res.write(`event: end\ndata: [DONE]\n\n`);
    res.end();
  },
};

export default questionsController;
