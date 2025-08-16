import mongoose, { Document, Schema } from "mongoose";
import { File } from "../schemas/file.schema";

export interface IFile extends Document, File {
  userID: string;
  extractedText: string;
  summary: string;
}

const fileSchema = new Schema<IFile>(
  {
    key: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
    contentType: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    extractedText: {
      type: String,
      default: null,
    },
    summary: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model<IFile>("File", fileSchema);
export default File;
