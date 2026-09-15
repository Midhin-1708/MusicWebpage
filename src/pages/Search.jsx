import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import SongRow from "../components/SongRow";
import ArtistCard from "../components/ArtistCard";
import AlbumCard from "../components/AlbumCard";
import PlaylistCard from "../components/PlaylistCard";
import songs, { categories } from "../data/songs";
import artists from "../data/artists";
import albums from "../data/albums";
import playlists from "../data/playlists";

export default function Search() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");

  useEffect(() => {
    if (params.get("q")) setQuery(params.get("q"));
  }, [params]);

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return null;
    return {
      songs: songs.filter(
        (s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
      ),
      artists: artists.filter((a) => a.name.toLowerCase().includes(q)),
      albums: albums.filter(
        (al) => al.title.toLowerCase().includes(q) || al.artist.toLowerCase().includes(q)
      ),
      playlists: playlists.filter((p) => p.title.toLowerCase().includes(q)),
    };
  }, [q]);

  const noResults =
    results &&
    !results.songs.length &&
    !results.artists.length &&
    !results.albums.length &&
    !results.playlists.length;

  return (
    <div className="max-w-[1400px] mx-auto">
      <SearchBar value={query} onChange={setQuery} />

      <AnimatePresence mode="wait">
        {!results && (
          <motion.section
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10"
          >
            <h2 className="text-xl font-bold mb-5">Browse all</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((c) => (
                <motion.button
                  key={c.id}
                  onClick={() => setQuery(c.name)}
                  whileHover={{ y: -4 }}
                  className="relative h-28 rounded-xl overflow-hidden p-4 text-left"
                  style={{ backgroundColor: c.color + "22" }}
                >
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{ background: `linear-gradient(135deg, ${c.color}66, transparent)` }}
                  />
                  <span className="relative text-base font-semibold text-white">{c.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {results && noResults && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-16 text-center text-neutral-500"
          >
            <p className="text-lg text-white mb-2">No results for "{query}"</p>
            <p className="text-sm">Try searching for an artist, song, or playlist.</p>
          </motion.div>
        )}

        {results && !noResults && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-10 space-y-10"
          >
            {results.songs.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4">Songs</h2>
                <div className="space-y-0.5">
                  {results.songs.map((s, i) => (
                    <SongRow key={s.id} song={s} index={i + 1} list={results.songs} />
                  ))}
                </div>
              </section>
            )}

            {results.artists.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4">Artists</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {results.artists.map((a) => (
                    <ArtistCard key={a.id} artist={a} />
                  ))}
                </div>
              </section>
            )}

            {results.albums.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4">Albums</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {results.albums.map((al) => (
                    <AlbumCard key={al.id} album={al} />
                  ))}
                </div>
              </section>
            )}

            {results.playlists.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4">Playlists</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {results.playlists.map((p) => (
                    <PlaylistCard key={p.id} playlist={p} />
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
