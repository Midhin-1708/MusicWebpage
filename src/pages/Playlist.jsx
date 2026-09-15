import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlay, FiHeart, FiMoreHorizontal } from "react-icons/fi";
import playlists from "../data/playlists";
import songs from "../data/songs";
import SongRow from "../components/SongRow";
import { usePlayer } from "../context/PlayerContext";

export default function Playlist() {
  const { id } = useParams();
  const playlist = playlists.find((p) => String(p.id) === id) || playlists[0];
  const { playSong } = usePlayer();

  // deterministic subset of songs for this playlist
  const start = (playlist.id * 3) % songs.length;
  const list = [...songs.slice(start), ...songs.slice(0, start)].slice(
    0,
    Math.min(playlist.songCount, songs.length)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1400px] mx-auto"
    >
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0">
          <img src={playlist.cover} alt="" className="w-full h-full object-cover blur-2xl scale-110 opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base/70 to-base" />
        </div>
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-6 px-6 sm:px-10 py-10 sm:py-14">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={playlist.cover}
            alt={playlist.title}
            className="w-40 h-40 sm:w-56 sm:h-56 rounded-xl object-cover shadow-2xl shrink-0"
          />
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-wider text-neutral-400 mb-2">Playlist</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
              {playlist.title}
            </h1>
            <p className="text-neutral-400 text-sm max-w-lg mb-3">{playlist.description}</p>
            <p className="text-sm text-neutral-500">
              <span className="text-white font-medium">{playlist.creator}</span> · {playlist.songCount} songs
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 mb-8 px-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => playSong(list[0], list)}
          className="w-14 h-14 rounded-full bg-accent text-black flex items-center justify-center shadow-glow"
        >
          <FiPlay size={22} className="ml-1" />
        </motion.button>
        <button className="text-neutral-400 hover:text-accent transition-colors">
          <FiHeart size={26} />
        </button>
        <button className="text-neutral-400 hover:text-white transition-colors">
          <FiMoreHorizontal size={26} />
        </button>
      </div>

      <div className="hidden sm:grid grid-cols-[2rem_3fr_2fr_1fr_auto] gap-4 px-4 pb-2 mb-2 border-b border-neutral-900 text-xs uppercase tracking-wider text-neutral-500">
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span></span>
        <span className="text-right">Time</span>
      </div>

      <div className="space-y-0.5">
        {list.map((song, i) => (
          <SongRow key={song.id} song={song} index={i + 1} list={list} />
        ))}
      </div>

      <Link to="/" className="inline-block mt-10 text-sm text-neutral-500 hover:text-accent transition-colors">
        ← Back to Home
      </Link>
    </motion.div>
  );
}
