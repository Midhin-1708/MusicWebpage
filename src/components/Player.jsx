import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiShuffle,
  FiSkipBack,
  FiSkipForward,
  FiPlay,
  FiPause,
  FiRepeat,
  FiVolume2,
  FiList,
  FiMonitor,
  FiHeart,
} from "react-icons/fi";
import { usePlayer } from "../context/PlayerContext";

export default function Player() {
  const {
    current,
    isPlaying,
    togglePlay,
    next,
    prev,
    progress,
    setProgress,
    volume,
    setVolume,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
  } = usePlayer();

  const intervalRef = useRef(null);

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 300);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, setProgress]);

  if (!current) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-neutral-800 px-3 sm:px-6 py-3">
      <div className="grid grid-cols-[1fr_auto] sm:grid-cols-3 items-center gap-3">
        {/* Left: track info */}
        <div className="flex items-center gap-3 min-w-0">
          <motion.img
            src={current.cover}
            alt={current.title}
            className="w-12 h-12 rounded-md object-cover shrink-0"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { repeat: Infinity, duration: 8, ease: "linear" }
                : { duration: 0.3 }
            }
          />
          <div className="min-w-0 hidden xs:block">
            <p className="text-sm font-medium text-white truncate">{current.title}</p>
            <p className="text-xs text-neutral-500 truncate">{current.artist}</p>
          </div>
          <button className="hidden sm:block text-neutral-500 hover:text-accent ml-2 shrink-0">
            <FiHeart size={16} />
          </button>
        </div>

        {/* Center: controls */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              onClick={() => setShuffle((s) => !s)}
              className={`transition-colors ${shuffle ? "text-accent" : "text-neutral-400 hover:text-white"}`}
            >
              <FiShuffle size={16} />
            </button>
            <button onClick={prev} className="text-neutral-300 hover:text-white transition-colors">
              <FiSkipBack size={18} />
            </button>
            <motion.button
              onClick={togglePlay}
              whileTap={{ scale: 0.9 }}
              className={`w-9 h-9 rounded-full bg-accent text-black flex items-center justify-center ${
                isPlaying ? "animate-pulseglow" : ""
              }`}
            >
              {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
            </motion.button>
            <button onClick={next} className="text-neutral-300 hover:text-white transition-colors">
              <FiSkipForward size={18} />
            </button>
            <button
              onClick={() => setRepeat((r) => !r)}
              className={`transition-colors ${repeat ? "text-accent" : "text-neutral-400 hover:text-white"}`}
            >
              <FiRepeat size={16} />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full max-w-md">
            <span className="text-[10px] text-neutral-500 w-8 text-right">
              {formatTime(progress)}
            </span>
            <div className="flex-1 h-1 bg-neutral-700 rounded-full overflow-hidden relative group cursor-pointer">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              <motion.div
                className="h-full bg-accent rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-500 w-8">{current.duration}</span>
          </div>
        </div>

        {/* Right: queue / volume */}
        <div className="hidden sm:flex items-center justify-end gap-4">
          <button className="text-neutral-400 hover:text-white transition-colors">
            <FiList size={17} />
          </button>
          <button className="text-neutral-400 hover:text-white transition-colors">
            <FiMonitor size={17} />
          </button>
          <div className="flex items-center gap-2 w-28">
            <FiVolume2 size={16} className="text-neutral-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Mobile play button */}
        <button
          onClick={togglePlay}
          className="sm:hidden w-9 h-9 rounded-full bg-accent text-black flex items-center justify-center justify-self-end"
        >
          {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
}

function formatTime(pct) {
  const totalSeconds = Math.floor((pct / 100) * 200);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
