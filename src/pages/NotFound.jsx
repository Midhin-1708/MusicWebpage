import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMusic } from "react-icons/fi";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center text-center py-24"
    >
      <FiMusic size={44} className="text-accent mb-6" />
      <h1 className="text-4xl font-extrabold mb-3">Track not found</h1>
      <p className="text-neutral-500 mb-8 max-w-sm">
        This page skipped like a scratched record. Let's get you back to the music.
      </p>
      <Link
        to="/"
        className="bg-accent text-black font-semibold px-6 py-3 rounded-full shadow-glowsm"
      >
        Back to Home
      </Link>
    </motion.div>
  );
}
