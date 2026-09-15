import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ArtistCard({ artist }) {
  return (
    <Link to={`/artist/${artist.id}`} className="w-36 sm:w-40 shrink-0 text-center group">
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="relative w-full aspect-square rounded-full overflow-hidden mb-3 ring-1 ring-neutral-800 group-hover:ring-accent/60 transition-all"
      >
        <img
          src={artist.image}
          alt={artist.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <p className="text-sm font-semibold text-white truncate">{artist.name}</p>
      <p className="text-xs text-neutral-500 truncate mt-0.5">Artist</p>
    </Link>
  );
}
