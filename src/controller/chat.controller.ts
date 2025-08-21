import { Request, Response } from "express";
import CustomError from "http-errors";
import mongoose from "mongoose";
import Chat from "../models/chat.model";
import Question from "../models/questions.model";
import { APIResponse } from "../utils/response";

const chatController = {
  async getAllChats(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const chats = await Chat.aggregate([
      {
        $match: {
          isDeleted: false,
          isArchived: false,
          userID: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "files",
          localField: "fileID",
          foreignField: "_id",
          as: "file",
        },
      },
      {
        $unwind: {
          path: "$file",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          userID: 1,
          fileID: 1,
          isDeleted: 1,
          isArchived: 1,
          createdAt: 1,
          updatedAt: 1,
          "file._id": 1,
          "file.name": 1,
          "file.key": 1,
          "file.summary": 1,
          "file.createdAt": 1,
          "file.size": 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (!chats || chats.length === 0) {
      throw CustomError(404, "Chats not found");
    }

    return res
      .status(200)
      .json(new APIResponse("Chats fetched successfully", chats));
  },

  async getChatById(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { chatId } = req.params;

    const chatResult = await Chat.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(chatId),
          userID: new mongoose.Types.ObjectId(id),
          isDeleted: false,
          isArchived: false,
        },
      },
      {
        $lookup: {
          from: "files",
          localField: "fileID",
          foreignField: "_id",
          as: "file",
        },
      },
      {
        $unwind: {
          path: "$file",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          userID: 1,
          fileID: 1,
          isDeleted: 1,
          isArchived: 1,
          createdAt: 1,
          updatedAt: 1,
          "file._id": 1,
          "file.name": 1,
          "file.key": 1,
          "file.summary": 1,
          "file.extractedText": 1,
          "file.size": 1,
          "file.createdAt": 1,
        },
      },
    ]);

    if (!chatResult || chatResult.length === 0) {
      throw CustomError(404, "Chat not found");
    }

    const chat = chatResult[0];

    // Get questions for this chat using aggregation
    const questions = await Question.aggregate([
      {
        $match: {
          chatID: new mongoose.Types.ObjectId(chatId),
          userID: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          _id: 1,
          userID: 1,
          chatID: 1,
          question: 1,
          answer: 1,
          questionTime: 1,
          answerTime: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    const chatData = {
      chat,
      questions,
    };

    return res
      .status(200)
      .json(new APIResponse("Chat fetched successfully", chatData));
  },
};

export default chatController;
