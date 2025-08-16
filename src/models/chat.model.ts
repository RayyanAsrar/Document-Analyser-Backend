import mongoose, { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
      index: true,
    },
    fileID: {
      type: String,
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

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
