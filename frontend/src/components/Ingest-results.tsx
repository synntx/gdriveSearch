import { CheckCircle, AlertCircle, Info } from "lucide-react";

interface IngestResultsProps {
  results: {
    processed: number;
    successful: number;
    failed: number;
  };
  className?: string;
}

export function IngestResults({ results, className }: IngestResultsProps) {
  const allSuccessful = results.failed === 0;

  return (
    <div
      className={`rounded-lg p-4 border ${
        allSuccessful
          ? "bg-[#e6f4ea] border-[#ceead6]"
          : "bg-[#fef7e0] border-[#feefc3]"
      } ${className || ""}`}
    >
      <div className="flex items-start">
        {allSuccessful ? (
          <CheckCircle className="h-5 w-5 text-[#1e8e3e] mt-0.5 mr-3 flex-shrink-0" />
        ) : (
          <Info className="h-5 w-5 text-[#f29900] mt-0.5 mr-3 flex-shrink-0" />
        )}

        <div>
          <h3 className="font-medium text-[#202124] mb-1">
            {allSuccessful
              ? "Processing complete"
              : "Processing completed with issues"}
          </h3>

          <div className="space-y-1 text-sm">
            <p className="text-[#5f6368]">
              <span className="font-medium">Processed:</span>{" "}
              {results.processed} files
            </p>
            <p className="text-[#1e8e3e] flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="font-medium">Successful:</span>{" "}
              {results.successful}
            </p>
            {results.failed > 0 && (
              <p className="text-[#d93025] flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="font-medium">Failed:</span> {results.failed}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
