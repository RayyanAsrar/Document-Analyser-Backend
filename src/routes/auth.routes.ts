import { Router } from "express";
import authController from "@/controller/auth.controller";
import asyncHandler from "@/utils/asyncHandler";

const authRouter = Router();

const { login, register } = authController;

authRouter.post("/register", asyncHandler(register));
authRouter.post("/login", asyncHandler(login));

export default authRouter;
