import { Request, Response } from "express";
import { getDriveClient } from "../services/drive.service";

export const getFiles = async (req: Request, res: Response): Promise<void> => {
  if (!req.session.tokens?.access_token) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  const accessToken = req.session.tokens.access_token;
  const drive = getDriveClient(accessToken);

  try {
    const response = await drive.files.list({
      q: "mimeType contains 'text' or mimeType='text/plain'",
      fields: "files(id, name, mimeType, size)",
    });

    console.log("response", response);

    const files = response.data.files?.filter((file) => {
      const fileName = file.name?.toLowerCase();
      return fileName?.endsWith(".txt") || fileName?.endsWith(".md");
    });

    console.log("files", files);

    res.json({ files });
  } catch (error) {
    console.error("Error fetching files from Google Drive:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};

export const getFilesByName = async (req: Request, res: Response) => {
  if (!req.session.tokens?.access_token) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  const accessToken = req.session.tokens.access_token;
  const drive = getDriveClient(accessToken);
  const { fileName } = req.params;

  try {
    const response = await drive.files.list({
      q: "mimeType contains 'text' or mimeType='text/plain'",
      fields: "files(id, name, mimeType)",
    });

    const files = response.data.files?.filter((file) => {
      const name = file.name?.toLowerCase();
      return (
        (name?.endsWith(".txt") || name?.endsWith(".md")) &&
        name?.includes(fileName.toLowerCase())
      );
    });

    res.json({ files });
  } catch (error) {
    console.error("Error fetching files from Google Drive:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};
