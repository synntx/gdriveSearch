import axios from "axios";
import { AxiosResponse } from "axios";

const API_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export interface FileInfo {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  size: number;
}

export interface SearchResult {
  score: number;
  fileId: string;
  fileName: string;
  driveLink: string;
}

export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const checkAuthStatus = async () => {
  try {
    const response =
      await api.get<AxiosResponse<{ authenticated: boolean }>>("/status");
    return response.data.authenticated;
  } catch (error) {
    console.error("Error checking auth status:", error);
    return false;
  }
};

export const getTextFiles = async (): Promise<FileInfo[]> => {
  const response = await api.get<AxiosResponse<FileInfo[]>>("/drive/files");
  return response.data.files || [];
};

export const ingestFiles = async () => {
  const response = await api.post("/ingest");
  return response.data;
};

export const searchFiles = async (query: string): Promise<SearchResult[]> => {
  const response = await api.get<AxiosResponse<SearchResult[]>>("/search", {
    params: { query },
  });
  return response.data.results || [];
};
