import { motion } from "framer-motion";

export default function SectionTitle({ title, subtitle, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="flex items-end justify-between mb-5"
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
        {subtitle && (
          <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
        )}
      </div>
      {action && (
        <button className="text-sm text-neutral-400 hover:text-accent transition-colors shrink-0">
          {action}
        </button>
      )}
    </motion.div>
  );
}
