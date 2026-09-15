import { FiPlay, FiPause, FiHeart } from "react-icons/fi";
import { usePlayer } from "../context/PlayerContext";

export default function SongRow({ song, index, list, showAlbum = true }) {
  const { playSong, current, isPlaying, togglePlay } = usePlayer();
  const active = current?.id === song.id;

  const handleClick = () => {
    if (active) {
      togglePlay();
    } else {
      playSong(song, list);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group grid grid-cols-[2rem_1fr_auto] sm:grid-cols-[2rem_3fr_2fr_1fr_auto] items-center gap-4 px-3 sm:px-4 py-2.5 rounded-lg hover:bg-card/70 cursor-pointer transition-colors ${
        active ? "bg-card/70" : ""
      }`}
    >
      <div className="w-6 flex items-center justify-center text-sm text-neutral-500">
        <span className="group-hover:hidden">
          {active && isPlaying ? (
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-full bg-accent animate-eq1" />
              <span className="w-0.5 h-full bg-accent animate-eq3" />
              <span className="w-0.5 h-full bg-accent animate-eq2" />
            </span>
          ) : (
            index
          )}
        </span>
        <span className="hidden group-hover:flex text-white">
          {active && isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
        </span>
      </div>

      <div className="flex items-center gap-3 min-w-0">
        <img
          src={song.cover}
          alt={song.title}
          loading="lazy"
          className="w-10 h-10 rounded-md object-cover shrink-0"
        />
        <div className="min-w-0">
          <p className={`text-sm font-medium truncate ${active ? "text-accent" : "text-white"}`}>
            {song.title}
          </p>
          <p className="text-xs text-neutral-500 truncate">{song.artist}</p>
        </div>
      </div>

      {showAlbum && (
        <p className="hidden sm:block text-sm text-neutral-500 truncate">{song.album}</p>
      )}

      <button
        onClick={(e) => e.stopPropagation()}
        className="hidden sm:flex text-neutral-500 hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
      >
        <FiHeart size={16} />
      </button>

      <p className="text-sm text-neutral-500 text-right">{song.duration}</p>
    </div>
  );
}
