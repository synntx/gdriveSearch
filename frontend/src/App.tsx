import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { checkAuthStatus } from "./utils/api";

import Auth from "./components/Auth";
import Search from "./components/Search";
import Navigation from "./components/Navigation";
import IngestPage from "./pages/IngestPage";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await checkAuthStatus();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />

        <main className="py-6">
          <Routes>
            <Route path="/ingest" element={<IngestPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<Navigate to="/ingest" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
