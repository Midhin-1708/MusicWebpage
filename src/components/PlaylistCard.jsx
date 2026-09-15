import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiPlay } from "react-icons/fi";

export default function PlaylistCard({ playlist }) {
  return (
    <motion.div
      whileHover={{ rotate: -1, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="w-44 sm:w-48 shrink-0"
    >
      <Link to={`/playlist/${playlist.id}`} className="group block bg-card hover:bg-cardhover rounded-xl p-3 transition-colors">
        <div className="relative rounded-lg overflow-hidden aspect-square mb-3 shadow-lg">
          <img
            src={playlist.cover}
            alt={playlist.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-accent flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-glowsm">
            <FiPlay className="text-black ml-0.5" size={15} />
          </span>
        </div>
        <p className="text-sm font-semibold text-white truncate">{playlist.title}</p>
        <p className="text-xs text-neutral-500 truncate mt-0.5">{playlist.songCount} songs</p>
      </Link>
    </motion.div>
  );
}
