import { motion } from "framer-motion";
import { FiMic } from "react-icons/fi";

export default function PodcastCard({ podcast }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="group w-44 sm:w-48 shrink-0 bg-card hover:bg-cardhover rounded-xl p-3 transition-colors cursor-pointer"
    >
      <div className="relative rounded-lg overflow-hidden aspect-square mb-3 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
        <img
          src={podcast.cover}
          alt={podcast.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center">
          <FiMic size={13} className="text-accent" />
        </span>
      </div>
      <p className="text-sm font-semibold text-white truncate">{podcast.title}</p>
      <p className="text-xs text-neutral-500 truncate mt-0.5">{podcast.host} · {podcast.episodes} episodes</p>
    </motion.div>
  );
}
