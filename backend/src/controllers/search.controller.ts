import { Request, Response } from "express";
import { searchVectors } from "../services/pinecone.service";
import { generateEmbedding } from "../services/embeddings.service";

export const searchFiles = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const completeTime = new Date();
  if (!req.session.tokens?.access_token) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  const { query } = req.query;

  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "Search query is required" });
    return;
  }

  try {
    console.log("Searching for files with query:", query);
    const startTime = new Date();
    const embedding = await generateEmbedding(query);
    console.log(
      `Generated embedding for query "${query}" in ${
        new Date().getTime() - startTime.getTime()
      }ms`,
    );

    const searchVectorsTime = new Date();
    const searchResults = await searchVectors(embedding);
    console.log(
      `Searched for files with query "${query}" in ${
        new Date().getTime() - searchVectorsTime.getTime()
      }ms`,
    );

    // Complete time taken by embedding generation and search

    console.log(
      `Search finished in ${new Date().getTime() - startTime.getTime()}ms`,
    );

    const formattedResults = searchResults.map((result) => ({
      score: result.score,
      fileId: result.metadata?.fileId,
      fileName: result.metadata?.fileName,
      driveLink: result.metadata?.driveLink,
    }));

    console.log(
      `Completed search for files with query "${query}" in ${
        new Date().getTime() - completeTime.getTime()
      }ms`,
    );
    res.json({
      query,
      timeTaken: new Date().getTime() - completeTime.getTime(),
      results: formattedResults,
    });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "Search failed" });
  }
};
