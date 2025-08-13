import User from "@/models/user.model";
import { userSchema, loginSchema } from "@/schemas/user.schema";
import validate from "@/utils/validation";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/token";
import { APIResponse } from "@/utils/response";
import CustomError from "http-errors";

const authController = {
  async register(req: Request, res: Response): Promise<Response> {
    const { data, success, error } = validate(userSchema, req.body);

    if (!success) {
      const message = error.issues?.[0]?.message || "Validation failed";
      throw CustomError(400, message);
    }

    const { username, email, password } = data;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw CustomError(400, "User Already exists");
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!hashedPassword) {
      throw CustomError(500, "Something went Wrong");
    }

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      role: user.role,
      provider: user.provider,
    };

    return res.status(201).json(
      new APIResponse("User registered successfully", {
        user: userData,
      })
    );
  },

  async login(req: Request, res: Response): Promise<Response> {
    const { data, success, error } = validate(loginSchema, req.body);

    if (!success) {
      const message = error.issues?.[0]?.message || "Validation failed";
      throw CustomError(400, message);
    }

    const { email, password } = data;

    const filters = { email, isDeleted: false };
    const user = await User.findOne(filters);

    if (!user) {
      throw CustomError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw CustomError(401, "Invalid email or password");
    }

    const token = generateToken(String(user._id), user.role);

    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      role: user.role,
      provider: user.provider,
    };

    return res.status(200).json(
      new APIResponse("Login successful", {
        user: userData,
        token,
      })
    );
  },
};

export default authController;
