import { motion } from "framer-motion";
import { FiPlay, FiHeadphones } from "react-icons/fi";
import { usePlayer } from "../context/PlayerContext";
import songs from "../data/songs";

export default function Hero() {
  const { playSong } = usePlayer();
  const featured = songs[0];

  return (
    <section className="relative w-full overflow-hidden rounded-2xl mb-10">
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 blur-[120px] rounded-full" />

      <div className="relative grid md:grid-cols-2 gap-8 items-center px-6 sm:px-10 py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-accent text-sm font-medium tracking-wide mb-4">
            New release · This week
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance">
            Music Brings
            <br />
            Us Together.
          </h1>
          <p className="text-neutral-400 mt-5 max-w-md text-sm sm:text-base">
            Stream the sound of 2026 — curated playlists, emerging artists,
            and the tracks everyone's talking about, all in one place.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => playSong(featured)}
              className="flex items-center gap-2 bg-accent text-black font-semibold px-6 py-3 rounded-full shadow-glow text-sm"
            >
              <FiPlay /> Play Now
            </motion.button>
            <button className="flex items-center gap-2 text-neutral-300 hover:text-white text-sm font-medium border border-neutral-700 px-6 py-3 rounded-full transition-colors">
              <FiHeadphones /> Browse
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative justify-self-center"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-neutral-800"
          >
            <img
              src={featured.cover}
              alt={featured.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-6 -left-8 w-24 h-24 rounded-xl overflow-hidden shadow-xl ring-1 ring-neutral-800 hidden sm:block"
          >
            <img
              src={songs[3].cover}
              alt={songs[3].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
