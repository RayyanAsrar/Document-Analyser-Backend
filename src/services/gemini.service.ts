import geminiGenAIClient from "@/config/geminiGenAIClient";

const modelName = "gemini-2.5-flash";

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await geminiGenAIClient.models.generateContent({
      model: modelName,
      contents: prompt,
      // Note: generationConfig might need to be passed differently depending on your SDK version
      // You can uncomment and adjust this if your SDK supports it:
      // generationConfig: {
      //   temperature: 0.3,
      //   topK: 20,
      //   topP: 0.8,
      //   maxOutputTokens: 8192,
      // },
    });

    if (!response || !response.candidates || response.candidates.length === 0) {
      throw new Error("No response from Gemini");
    }

    const content: any = response.candidates[0].content?.parts?.[0].text;

    if (!content || content.length === 0) {
      throw new Error("Empty response from Gemini");
    }

    return content;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
