import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { usePlayer } from "../context/PlayerContext";

export default function MusicCard({ song }) {
  const { playSong, current, isPlaying } = usePlayer();
  const active = current?.id === song.id && isPlaying;

  return (
    <motion.button
      onClick={() => playSong(song)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group w-40 sm:w-44 shrink-0 text-left bg-card hover:bg-cardhover rounded-xl p-3 transition-colors"
    >
      <div className="relative rounded-lg overflow-hidden aspect-square mb-3">
        <img
          src={song.cover}
          alt={song.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span
          className={`absolute bottom-2 right-2 w-9 h-9 rounded-full bg-accent flex items-center justify-center shadow-glowsm transition-all duration-300 ${
            active ? "opacity-100 scale-100" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          <FiPlay className="text-black ml-0.5" size={15} />
        </span>
      </div>
      <p className="text-sm font-semibold text-white truncate">{song.title}</p>
      <p className="text-xs text-neutral-500 truncate mt-0.5">{song.artist}</p>
    </motion.button>
  );
}
