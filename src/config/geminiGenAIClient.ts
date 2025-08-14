import { GoogleGenAI } from "@google/genai";
import env from "../config/env";

const { GEMINI_API_KEY } = env;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

const geminiGenAIClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default geminiGenAIClient;