import { Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
import "dotenv/config";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!!,
});

const indexName = process.env.PINECONE_INDEX_NAME || "gdrive-search";
const index = pinecone.Index(indexName);

export interface FileMetadata {
  fileId: string;
  fileName: string;
  driveLink: string;
  mimeType: string;
}

export const upsertVector = async (
  id: string,
  vector: number[],
  metadata: FileMetadata,
) => {
  try {
    await index.upsert([
      {
        id,
        values: vector,
        metadata: metadata as unknown as RecordMetadata,
      },
    ]);
    return true;
  } catch (error) {
    console.error("Error upserting vector:", error);
    throw new Error("Failed to upsert vector");
  }
};

export const searchVectors = async (vector: number[], topK: number = 5) => {
  try {
    const results = await index.query({
      vector,
      topK,
      includeMetadata: true,
    });
    return results.matches;
  } catch (error) {
    console.error("Error searching vectors in Pinecone:", error);
    throw error;
  }
};
