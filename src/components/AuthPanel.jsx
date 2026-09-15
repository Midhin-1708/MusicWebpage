import { motion } from "framer-motion";

export default function AuthPanel({ heading, body }) {
  return (
    <div className="relative hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between overflow-hidden bg-card px-12 py-12">
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center gap-2"
      >
        <span className="h-3 w-3 rounded-full bg-accent shadow-glowsm" />
        <span className="text-lg font-bold tracking-tight text-white">WeMusic</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative flex flex-1 items-center justify-center"
      >
        <div className="relative flex h-56 w-56 items-center justify-center">
          <div
            className="absolute inset-0 animate-spinslow rounded-full border-[10px] border-neutral-800"
            style={{
              background:
                "conic-gradient(from 90deg, #1ED760, #090909 60%)",
            }}
          />
          <div className="relative h-16 w-16 rounded-full bg-base border-4 border-neutral-700" />
        </div>
      </motion.div>

      <div className="relative flex items-end gap-1.5 h-8 mb-8">
        <span className="w-1.5 h-full bg-accent rounded-full animate-eq1" />
        <span className="w-1.5 h-full bg-accent rounded-full animate-eq2" />
        <span className="w-1.5 h-full bg-accent rounded-full animate-eq3" />
        <span className="w-1.5 h-full bg-accent rounded-full animate-eq4" />
        <span className="w-1.5 h-full bg-accent rounded-full animate-eq2" />
        <span className="w-1.5 h-full bg-accent rounded-full animate-eq1" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative"
      >
        <h2 className="text-3xl font-bold text-white mb-3 max-w-xs text-balance">
          {heading}
        </h2>
        <p className="text-neutral-400 text-sm max-w-xs">{body}</p>
      </motion.div>
    </div>
  );
}