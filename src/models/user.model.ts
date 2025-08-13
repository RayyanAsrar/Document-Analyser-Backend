import { model, Schema } from "mongoose";
import { UserSchema } from "@/schemas/user.schema";

const userSchema = new Schema<UserSchema>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["google", "credentials"],
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const User = model<UserSchema>("User", userSchema);
export default User;
