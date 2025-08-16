import mongoose, { Schema, model, Document } from "mongoose";
import { Chat } from "../schemas/chat.schema";

export interface IChat extends Document, Chat {
  userID: mongoose.Types.ObjectId;
  fileID: mongoose.Types.ObjectId;
}

const chatSchema = new Schema<IChat>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileID: {
      type: Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isArchived: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = model<IChat>("Chat", chatSchema);
export default ChatModel;
