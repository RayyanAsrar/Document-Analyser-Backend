import { Router } from "express";
import chatController from "../controller/chat.controller";
import asyncHandler from "../utils/asyncHandler";
import { protect } from "../middlewares/auth.middleware";

const chatRouter: Router = Router();

const { getAllChats, getChatById } = chatController;

chatRouter.get("/", protect, asyncHandler(getAllChats));
chatRouter.get("/:chatId", protect, asyncHandler(getChatById));

export default chatRouter;
