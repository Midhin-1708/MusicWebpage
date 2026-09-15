import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiBell,
  FiUser,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "W";

  const handleProfile = () => {
    setOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/signin", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/70 bg-base/80 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 hover:bg-card hover:text-white transition-colors lg:hidden"
            aria-label="Open menu"
          >
            <FiMenu size={20} />
          </button>

          {/* Page / Brand Area */}
          <div className="lg:hidden flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-glowsm" />

            <span className="text-base font-bold tracking-tight text-white">
              WeMusic
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 hover:bg-card hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <FiBell size={18} />

            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-neutral-800" />

          {/* Account Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="flex items-center gap-2 sm:gap-3 rounded-full px-1.5 py-1.5 hover:bg-card transition-colors"
              aria-expanded={open}
              aria-haspopup="menu"
            >
              {/* Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-black shadow-glowsm">
                {initials}
              </div>

              {/* User Info */}
              <div className="hidden md:block text-left max-w-[150px]">
                <p className="truncate text-sm font-medium text-white">
                  {user?.name || "WeMusic User"}
                </p>

                <p className="truncate text-[11px] text-neutral-500">
                  {user?.email || "Account"}
                </p>
              </div>

              {/* Arrow */}
              <FiChevronDown
                size={15}
                className={`hidden sm:block text-neutral-500 transition-transform duration-200 ${
                  open ? "rotate-180 text-accent" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-neutral-800 bg-card shadow-2xl"
                >
                  {/* Account Header */}
                  <div className="border-b border-neutral-800 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-black">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {user?.name || "WeMusic User"}
                        </p>

                        <p className="truncate text-xs text-neutral-500 mt-0.5">
                          {user?.email || "No email available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {/* Profile */}
                    <button
                      type="button"
                      onClick={handleProfile}
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-neutral-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                        <FiUser size={16} />
                      </span>

                      <div>
                        <p className="font-medium">
                          Profile
                        </p>

                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Manage your account
                        </p>
                      </div>
                    </button>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="group mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-400 hover:bg-red-500/5 transition-colors"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/5 text-red-400 group-hover:bg-red-500/10 transition-colors">
                        <FiLogOut size={16} />
                      </span>

                      <div>
                        <p className="font-medium">
                          Logout
                        </p>

                        <p className="text-[11px] text-red-400/50 mt-0.5">
                          Sign out of WeMusic
                        </p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}