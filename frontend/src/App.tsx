import { Toaster } from "@/components/ui/sonner";
import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import HomePage from "./pages/Homepage/HomePage";
import Watchlist from "./pages/watchlist/Watchlist";
import Dashboard from "./pages/Dashboard/DashBoard";
import { useState, useEffect } from "react";
import AllShows from "./pages/allshows/AllShows";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Toaster position="top-center" richColors expand />
      <Routes>
        <Route
          path="/"
          element={
            !token ? (
              <Authentication
                onLoginSuccess={() => setToken(localStorage.getItem("token"))}
              />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {token && (
          <Route element={<Dashboard />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/allshows" element={<AllShows />} />
          </Route>
        )}

        <Route
          path="*"
          element={<Navigate to={token ? "/home" : "/"} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
