import { motion } from "framer-motion";
import songs from "../data/songs";
import SongRow from "../components/SongRow";
import { FiPlay, FiHeart } from "react-icons/fi";
import { usePlayer } from "../context/PlayerContext";

export default function Liked() {
  const { playSong } = usePlayer();
  const liked = songs.slice(0, 12);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1400px] mx-auto"
    >
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-accent/30 via-card to-base px-6 sm:px-10 py-12 flex items-center gap-6">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl bg-black/40 flex items-center justify-center shrink-0">
          <FiHeart size={44} className="text-accent" fill="#1ED760" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-300 mb-2">Playlist</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Liked Songs</h1>
          <p className="text-sm text-neutral-300 mt-2">{liked.length} songs</p>
        </div>
      </div>

      <button
        onClick={() => playSong(liked[0], liked)}
        className="w-14 h-14 rounded-full bg-accent text-black flex items-center justify-center shadow-glow mb-8"
      >
        <FiPlay size={22} className="ml-1" />
      </button>

      <div className="space-y-0.5">
        {liked.map((song, i) => (
          <SongRow key={song.id} song={song} index={i + 1} list={liked} />
        ))}
      </div>
    </motion.div>
  );
}
