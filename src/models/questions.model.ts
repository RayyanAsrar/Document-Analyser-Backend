import mongoose, { Schema, model, Document } from "mongoose";
import { Question } from "../schemas/questions.schema";

export interface IQuestion extends Document, Question {
  userID: mongoose.Types.ObjectId;
  chatID: mongoose.Types.ObjectId;
}

const questionSchema = new Schema<IQuestion>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatID: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    questionTime: {
      type: Date,
      default: Date.now,
    },
    answerTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const QuestionModel = model<IQuestion>("Question", questionSchema);
export default QuestionModel;
