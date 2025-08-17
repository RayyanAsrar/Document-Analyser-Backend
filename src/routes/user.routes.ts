import userController from "../controller/user.controller";
import { protect } from "../middlewares/auth.middleware";
import asyncHandler from "../utils/asyncHandler";
import { Router } from "express";

const userRouter: Router = Router();

const { getCurrentUser } = userController;

userRouter.get("/current", protect, asyncHandler(getCurrentUser));

export default userRouter;
