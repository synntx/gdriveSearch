import { FileIcon, FileTextIcon, Loader2 } from "lucide-react";
import { FileInfo } from "../services/api";

interface FileTableProps {
  files: FileInfo[];
  loading: boolean;
  className?: string;
}

export function FileTable({ files, loading, className }: FileTableProps) {
  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes("text/plain")) {
      return <FileTextIcon className="h-4 w-4 text-blue-500" />;
    }
    return <FileIcon className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <table className="w-full">
        <thead>
          <tr className="bg-[#F8F9FA]">
            <th className="px-6 py-3 text-left text-xs font-medium text-[#5f6368] uppercase tracking-wider w-[60%]">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#5f6368] uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#5f6368] uppercase tracking-wider">
              Size
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#f1f3f4]">
          {loading ? (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center">
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-6 w-6 text-[#5f6368] animate-spin mr-2" />
                  <span className="text-[#5f6368]">Loading files...</span>
                </div>
              </td>
            </tr>
          ) : files.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center">
                <div className="flex flex-col items-center justify-center text-[#5f6368]">
                  <FileIcon className="h-12 w-12 mb-2 text-gray-300" />
                  <p>No text files found in your Google Drive</p>
                </div>
              </td>
            </tr>
          ) : (
            files.map((file) => (
              <tr
                key={file.id}
                className="hover:bg-[#F8F9FA] transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getFileIcon(file.mimeType)}
                    <span className="ml-2 text-[#202124] font-medium">
                      {file.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5f6368]">
                  {file.mimeType.split("/")[1]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5f6368]">
                  {file.size ? `${Math.round(file.size / 1024)} KB` : "—"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
