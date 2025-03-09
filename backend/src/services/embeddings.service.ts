import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!!);

export const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    const model = genAi.getGenerativeModel({
      model: "text-embedding-004",
    });
    const result = await model.embedContent(text);
    const embedding = result.embedding.values;
    return embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
};
