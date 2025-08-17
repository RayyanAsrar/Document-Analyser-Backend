import jwt from "jsonwebtoken";
import CustomError from "http-errors";
import env from "../config/env";

const { JWT_SECRET } = env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: "24h",
  });
};

export const verifyToken = (token: string) => {
  try {
    const key = JWT_SECRET;

    return jwt.verify(token, key as string);
  } catch (error) {
    throw CustomError(401, "Expired or invalid token");
  }
};