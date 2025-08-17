import mongoose from "mongoose";
import Question from "../models/questions.model";
import Chat from "../models/chat.model";
import File from "../models/file.model";
import { APIResponse } from "../utils/response";
import { Request, Response } from "express";
import CustomError from "http-errors";
import { getGeminiResponse } from "../services/gemini.service";
import { getQuestionPrompt } from "../utils/prompt";
import { date } from "zod";
import validate from "../utils/validation";
import { questionSchema, questionTextSchema } from "../schemas/questions.schema";
import { EditImageResponse } from "@google/genai";

const questionsController = {
  async askQuestion(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { chatId } = req.params;

    const questionTime = new Date(Date.now());

    const {
      data: questionData,
      success,
      error,
    } = validate(questionTextSchema, req.body);
    if (!success) {
      throw CustomError(400, error.issues?.[0]?.message || "Validation failed");
    }
    const { question } = questionData;

    const chatFilters = {
      _id: chatId,
      userID: id,
      isDeleted: false,
    };
    const chat = await Chat.findOne(chatFilters);
    if (!chat) throw CustomError(404, "Chat not found or access denied");

    const fileFilters = {
      _id: chat.fileID,
      userID: id,
      isDeleted: false,
    };
    const file = await File.findOne(fileFilters);
    if (!file) throw CustomError(404, "File not found or access denied");
    if (!file.extractedText)
      throw CustomError(400, "File text has not been extracted yet");

    const questionFilters = {
      chatID: chatId,
      userID: id,
    };
    const previousQuestions = await Question.find(questionFilters)
      .sort({ questionTime: -1 })
      .limit(5)
      .lean();

    const prompt = getQuestionPrompt(
      file.extractedText,
      question,
      previousQuestions
    );
    const answer = await getGeminiResponse(prompt);

    const answerTime = new Date(Date.now());

    const questionObj = { question, answer, questionTime, answerTime };
    const { success: schemaValid, error: schemaError } = validate(
      questionSchema,
      questionObj
    );
    if (!schemaValid)
      throw CustomError(
        400,
        schemaError.issues?.[0]?.message || "Invalid question format"
      );

    const newQuestion = await Question.create({
      userID: id,
      chatID: chatId,
      ...questionObj,
    });
    if (!newQuestion) throw CustomError(500, "Failed to save question");

    const response = {
      questionId: newQuestion._id,
      question: newQuestion.question,
      answer: newQuestion.answer,
      questionTime: newQuestion.questionTime,
      answerTime: newQuestion.answerTime,
    };

    return res
      .status(201)
      .json(new APIResponse("Question answered successfully", response));
  },
};

export default questionsController;
