import { NextFunction, Request, Response } from "express";
import CustomError from "http-errors";
import { tokenSchema } from "@/schemas/user.schema";
import { verifyToken } from "@/utils/token";
import validate from "@/utils/validation";

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const accessToken = req.headers.authorization?.split(" ")[1] || "";

  const validationResult = validate(tokenSchema, {
    token: accessToken,
  });

  if (!validationResult.success) {
    const message =
      validationResult.error.issues?.[0]?.message || "Validation failed";
    throw CustomError(400, message);
  }

  const { token } = validationResult.data;

  const decoded = verifyToken(token);
  req.user = decoded;
  next();
};
