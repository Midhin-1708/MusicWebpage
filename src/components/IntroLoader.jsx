import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader({ onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 600);
    }, 2700);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-base"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative w-28 h-28 rounded-full bg-gradient-to-br from-neutral-800 to-black border border-neutral-700 shadow-glow flex items-center justify-center animate-spinslow"
          >
            <div className="w-8 h-8 rounded-full bg-accent shadow-glowsm" />
            <div className="absolute inset-0 rounded-full border border-neutral-700" />
          </motion.div>

          <div className="flex items-end gap-1 h-8 mt-8">
            <span className="w-1 bg-accent rounded-full animate-eq1" />
            <span className="w-1 bg-accent rounded-full animate-eq2" />
            <span className="w-1 bg-accent rounded-full animate-eq3" />
            <span className="w-1 bg-accent rounded-full animate-eq4" />
            <span className="w-1 bg-accent rounded-full animate-eq2" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            We<span className="text-accent">Music</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mt-2 text-sm text-neutral-400 tracking-wide"
          >
            Music Brings Us Together.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
