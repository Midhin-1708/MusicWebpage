import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import IntroLoader from "./components/IntroLoader";
import MainLayout from "./layouts/MainLayout";
import { PlayerProvider } from "./context/PlayerContext";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";
import Search from "./pages/Search";
import Liked from "./pages/Liked";
import NotFound from "./pages/NotFound";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <PlayerProvider>
      <AnimatePresence mode="wait">
        {loading && <IntroLoader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/search" element={<Search />} />
              <Route path="/liked" element={<Liked />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </PlayerProvider>
  );
}
