import User from "../models/user.model";
import { APIResponse } from "../utils/response";
import { Request, Response } from "express";
import CustomError from "http-errors";

const userController = {
  async getCurrentUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      throw CustomError(404, "User not found");
    }

    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      role: user.role,
      provider: user.provider,
    };

    return res
      .status(200)
      .json(new APIResponse("Current User Found", userData));
  },
};

export default userController;
