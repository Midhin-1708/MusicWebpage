import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";

export default function AlbumCard({ album }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="group w-44 sm:w-48 shrink-0 bg-card hover:bg-cardhover rounded-xl p-3 transition-colors cursor-pointer"
    >
      <div className="relative rounded-lg overflow-hidden aspect-square mb-3">
        <img
          src={album.cover}
          alt={album.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-accent flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-glowsm">
          <FiPlay className="text-black ml-0.5" size={15} />
        </span>
      </div>
      <p className="text-sm font-semibold text-white truncate">{album.title}</p>
      <p className="text-xs text-neutral-500 truncate mt-0.5">{album.artist} · {album.year}</p>
    </motion.div>
  );
}
