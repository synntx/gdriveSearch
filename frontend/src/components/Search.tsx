import React, { useState, useEffect, useCallback } from "react";
import { searchFiles, SearchResult } from "../utils/api";
import { SearchIcon, Loader2, FileText, ExternalLink } from "lucide-react";
import { debounce } from "../utils/debounce";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const searchResults = await searchFiles(searchQuery);
        setResults(searchResults);
        setSearched(true);
      } catch (err) {
        setError("Failed to perform search. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setResults([]);
      setSearched(false);
    }
  }, [query, debouncedSearch]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-medium text-[#202124] mb-6">
        Semantic Search
      </h1>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-[#5f6368]" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search across your documents..."
          className="block w-full pl-10 pr-20 py-3 border border-[#dadce0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent text-[#202124]"
        />
      </div>

      {loading && (
        <div className="flex justify-center mt-4">
          <Loader2 className="h-6 w-6 animate-spin text-[#1a73e8]" />
        </div>
      )}

      {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

      {searched && (
        <div className="mt-6 border border-[#dadce0] rounded-lg bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8F9FA]">
                <th className="px-6 py-3 text-left text-xs font-medium text-[#5f6368] uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#5f6368] uppercase tracking-wider">
                  Relevance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#5f6368] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3f4]">
              {results.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-[#5f6368]"
                  >
                    No matching files found
                  </td>
                </tr>
              ) : (
                results.map((result) => (
                  <tr
                    key={result.fileId}
                    className="hover:bg-[#F8F9FA] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-[#1a73e8] mr-2" />
                        <span className="text-[#202124] font-medium">
                          {result.fileName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-24 h-2 bg-[#f1f3f4] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            result.score > 0.75
                              ? "bg-[#1e8e3e]"
                              : result.score > 0.5
                                ? "bg-[#1a73e8]"
                                : result.score > 0.25
                                  ? "bg-[#f29900]"
                                  : "bg-[#d93025]"
                          }`}
                          style={{ width: `${result.score * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={result.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1a73e8] hover:text-[#1765cc] font-medium text-sm"
                      >
                        Open in Drive
                        <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Search;
