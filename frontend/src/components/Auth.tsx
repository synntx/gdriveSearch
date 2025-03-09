import React from "react";
import { loginWithGoogle } from "../utils/api";
import GoogleGIcon from "../icons/GoogleGIcon";

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="max-w-md w-full p-8 bg-white rounded-lg border border-[#dadce0] m-4">
        <div className="text-center mb-8">
          <svg
            className="h-12 w-12 mx-auto mb-4"
            viewBox="0 0 87.3 78"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
              fill="#0066da"
            />
            <path
              d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
              fill="#00ac47"
            />
            <path
              d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
              fill="#ea4335"
            />
            <path
              d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
              fill="#00832d"
            />
            <path
              d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
              fill="#2684fc"
            />
            <path
              d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
              fill="#ffba00"
            />
          </svg>
          <h1 className="text-2xl font-medium text-[#202124]">
            Google Drive Semantic Search
          </h1>
        </div>

        <div className="bg-[#f8f9fa] p-4 rounded-lg mb-6 border border-[#dadce0]">
          <p className="text-[#5f6368] text-sm leading-relaxed">
            Connect your Google Drive to enable powerful semantic search across
            your text files. This app helps you find content based on meaning,
            not just keywords.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center gap-2 justify-center bg-white border border-[#dadce0] rounded-md shadow-sm px-6 py-3 text-[#202124] hover:bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-opacity-50 transition-colors"
          >
            <GoogleGIcon className="h-6 w-6" />
            Sign in with Google
          </button>

          <button className="w-full flex items-center justify-center bg-[#1a73e8] rounded-md px-6 py-3 text-white hover:bg-[#1765cc] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-opacity-50 transition-colors">
            Learn more
          </button>
        </div>

        <p className="mt-8 text-xs text-center text-[#5f6368]">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Auth;
