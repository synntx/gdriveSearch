"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCw, Upload, AlertCircle } from "lucide-react";
import { FileInfo, getTextFiles, ingestFiles } from "../utils/api";
import { PageHeader } from "../components/IngestPageHeader";
import { IngestResults } from "../components/Ingest-results";
import { FileTable } from "../components/FileTable";

export default function IngestPage() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [ingesting, setIngesting] = useState(false);
  const [ingestResults, setIngestResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const fileList = await getTextFiles();
      setFiles(fileList);
    } catch (err) {
      setError("Failed to fetch files. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleIngest = async () => {
    setIngesting(true);
    setError(null);
    setIngestResults(null);

    try {
      const results = await ingestFiles();
      setIngestResults(results);
    } catch (err) {
      setError("Failed to ingest files. Please try again.");
      console.error(err);
    } finally {
      setIngesting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <PageHeader
          title="File Ingestion"
          description="Process your text files for search capabilities"
        />

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={fetchFiles}
            disabled={loading}
            className="flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-[#5f6368] bg-white border border-[#dadce0] rounded-md hover:bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading files...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Files
              </>
            )}
          </button>

          <button
            onClick={handleIngest}
            disabled={ingesting || files.length === 0}
            className="flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white bg-[#1a73e8] rounded-md hover:bg-[#1765cc] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {ingesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Process Files for Search
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-start p-4 border border-[#f5c2c7] bg-[#f8d7da] rounded-md">
            <AlertCircle className="h-5 w-5 text-[#dc3545] mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-[#842029]">{error}</p>
          </div>
        )}

        {ingestResults && (
          <IngestResults results={ingestResults} className="mb-6" />
        )}

        <div className="bg-white rounded-lg  border border-[#dadce0] overflow-hidden">
          <FileTable files={files} loading={loading} />
        </div>
      </div>
    </div>
  );
}
