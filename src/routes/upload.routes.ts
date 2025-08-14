import { Router } from "express";
import uploadController from "@/controller/upload.controller";
import asyncHandler from "@/utils/asyncHandler";
import { protect } from "@/middlewares/auth.middleware";

const uploadRouter: Router = Router();

const { generateDownloadURl, generateUploadUrl } = uploadController;

uploadRouter.post("/", protect, asyncHandler(generateUploadUrl));
uploadRouter.post("/download", protect, asyncHandler(generateDownloadURl));

export default uploadRouter;
