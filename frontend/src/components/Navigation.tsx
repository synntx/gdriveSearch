import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Search } from "lucide-react";
import GoogleDriveIcon from "../icons/GoogleDriveIcon";

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-[#dadce0] sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 gap-3 flex items-center">
              <GoogleDriveIcon className="h-8 w-8" />
              <span className="text-xl font-medium text-[#202124]">
                Drive Search
              </span>
            </div>
          </div>

          <div className="flex space-x-1">
            <Link
              to="/ingest"
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/ingest"
                  ? "bg-[#e8f0fe] text-[#1a73e8]"
                  : "text-[#5f6368] hover:bg-[#f1f3f4]"
              }`}
            >
              <FileText className="h-4 w-4 mr-2" />
              Ingest Files
            </Link>

            <Link
              to="/search"
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/search"
                  ? "bg-[#e8f0fe] text-[#1a73e8]"
                  : "text-[#5f6368] hover:bg-[#f1f3f4]"
              }`}
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
