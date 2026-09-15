import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import IntroLoader from "./components/IntroLoader";
import MainLayout from "./layouts/MainLayout";

import { PlayerProvider } from "./context/PlayerContext";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";
import Search from "./pages/Search";
import Liked from "./pages/Liked";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <PlayerProvider>
        <AuthProvider>
          {/* Intro Loader */}
          <AnimatePresence mode="wait">
            {loading && (
              <IntroLoader
                key="loader"
                onDone={() => setLoading(false)}
              />
            )}
          </AnimatePresence>

          {/* Application */}
          {!loading && (
            <Routes>
              {/* =========================
                  AUTH PAGES
              ========================== */}

              <Route
                path="/signin"
                element={<SignIn />}
              />

              <Route
                path="/signup"
                element={<SignUp />}
              />

              {/* =========================
                  MAIN APPLICATION
              ========================== */}

              <Route element={<MainLayout />}>
                {/* Home */}
                <Route
                  index
                  element={<Home />}
                />

                {/* Playlist */}
                <Route
                  path="/playlist/:id"
                  element={<Playlist />}
                />

                {/* Artist */}
                <Route
                  path="/artist/:id"
                  element={<Artist />}
                />

                {/* Search */}
                <Route
                  path="/search"
                  element={<Search />}
                />

                {/* Liked Songs */}
                <Route
                  path="/liked"
                  element={<Liked />}
                />

                {/* Profile */}
                <Route
                  path="/profile"
                  element={<Profile />}
                />

                {/* 404 */}
                <Route
                  path="*"
                  element={<NotFound />}
                />
              </Route>
            </Routes>
          )}
        </AuthProvider>
      </PlayerProvider>
    </BrowserRouter>
  );
}