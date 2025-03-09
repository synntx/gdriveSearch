import { Request, Response } from "express";
import { getDriveClient, getFileContent } from "../services/drive.service";
import { upsertVector } from "../services/pinecone.service";
import { generateEmbedding } from "../services/embeddings.service";

export const ingestFiles = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.session.tokens?.access_token) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  const accessToken = req.session.tokens.access_token;
  const drive = getDriveClient(accessToken);

  try {
    const response = await drive.files.list({
      q: "mimeType contains 'text' or mimeType='text/plain'",
      fields: "files(id, name, mimeType, webViewLink)",
    });

    const files = response.data.files?.filter((file) => {
      const fileName = file.name?.toLowerCase();
      return fileName?.endsWith(".txt") || fileName?.endsWith(".md");
    });

    if (!files || files.length === 0) {
      res.json({ message: "No text files found to ingest" });
      return;
    }

    const results = [];

    for (const file of files) {
      try {
        const content = await getFileContent(file.id!, accessToken);

        const embedding = await generateEmbedding(content);

        await upsertVector(file.id!, embedding, {
          fileId: file.id!,
          fileName: file.name!,
          driveLink:
            file.webViewLink ||
            `https://drive.google.com/file/d/${file.id}/view`,
          mimeType: file.mimeType || "n/a",
        });

        results.push({
          fileId: file.id,
          fileName: file.name,
          status: "success",
        });
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        results.push({
          fileId: file.id,
          fileName: file.name,
          status: "error",
          error: (error as Error).message,
        });
      }
    }

    res.json({
      processed: results.length,
      successful: results.filter((r) => r.status === "success").length,
      failed: results.filter((r) => r.status === "error").length,
      results,
    });
  } catch (error) {
    console.error("Error during file ingestion:", error);
    res.status(500).json({ error: "Failed to ingest files" });
  }
};
