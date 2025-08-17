import { Router } from "express";
import questionsController from "../controller/questions.controller";
import asyncHandler from "../utils/asyncHandler";
import { protect } from "../middlewares/auth.middleware";

const questionsRouter: Router = Router();

const { askQuestion } = questionsController;

questionsRouter.post("/:chatId/ask", protect, asyncHandler(askQuestion));

export default questionsRouter;
