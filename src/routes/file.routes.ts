import { Router } from "express";
import fileController from "../controller/file.controller";
import asyncHandler from "../utils/asyncHandler";
import { protect } from "../middlewares/auth.middleware";

const fileRouter: Router = Router();

const { processFile, getAllFiles } = fileController;

fileRouter.post("/process", protect, asyncHandler(processFile));
fileRouter.get("/", protect, asyncHandler(getAllFiles));

export default fileRouter;
