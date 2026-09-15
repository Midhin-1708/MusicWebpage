import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiChevronLeft, FiChevronRight, FiBell } from "react-icons/fi";

export default function Topbar({ onMenuClick }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-lg bg-base/80 border-b border-neutral-900">
      <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-neutral-300 hover:text-white"
        >
          <FiMenu size={22} />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-neutral-300 hover:text-white"
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            onClick={() => navigate(1)}
            className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-neutral-300 hover:text-white"
          >
            <FiChevronRight size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-auto sm:mx-0">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search songs, artists, albums..."
            className="w-full bg-card text-sm text-white placeholder-neutral-500 rounded-full px-4 py-2 outline-none focus:ring-1 focus:ring-accent transition-all"
          />
        </form>

        <div className="ml-auto flex items-center gap-3">
          <button className="text-neutral-300 hover:text-white">
            <FiBell size={19} />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accentdim shadow-glowsm" />
        </div>
      </div>
    </header>
  );
}
