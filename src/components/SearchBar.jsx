import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder = "What do you want to listen to?" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-2xl"
    >
      <FiSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
        size={18}
      />
      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-full bg-card focus:bg-cardhover text-white placeholder-neutral-500 rounded-full pl-12 pr-12 py-3.5 text-sm outline-none ring-1 ring-transparent focus:ring-accent transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
        >
          <FiX size={18} />
        </button>
      )}
    </motion.div>
  );
}
