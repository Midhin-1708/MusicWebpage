import { createContext, useContext, useState } from "react";
import songs from "../data/songs";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [queue, setQueue] = useState(songs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(70);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const current = queue[currentIndex] || songs[0];

  const playSong = (song, list = songs) => {
    const idx = list.findIndex((s) => s.id === song.id);
    setQueue(list);
    setCurrentIndex(idx === -1 ? 0 : idx);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  const next = () => {
    setCurrentIndex((i) => (i + 1) % queue.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + queue.length) % queue.length);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        queue,
        current,
        isPlaying,
        progress,
        volume,
        shuffle,
        repeat,
        setProgress,
        setVolume,
        setShuffle,
        setRepeat,
        playSong,
        togglePlay,
        next,
        prev,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
