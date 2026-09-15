import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiSearch,
  FiHeart,
  FiPlusCircle,
  FiX,
  FiMusic,
  FiChevronRight,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import playlists from "../data/playlists";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "Home", icon: FiHome },
  { to: "/search", label: "Search", icon: FiSearch },
  { to: "/liked", label: "Liked Songs", icon: FiHeart },
  { to: "/profile", label: "Profile", icon: FiUser },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "W";

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/signin", { replace: true });
  };

  const content = (
    <div className="flex h-full min-h-0 flex-col">

      {/* ================= LOGO ================= */}
      <div className="flex shrink-0 items-center justify-between px-5 pb-6 pt-6 sm:px-6 sm:pt-7">
        <NavLink
          to="/"
          onClick={onClose}
          className="group flex items-center gap-3"
        >
          <div
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-xl bg-accent text-black
              shadow-glowsm
              transition-all duration-300
              group-hover:scale-105
              group-hover:shadow-[0_0_22px_rgba(30,215,96,0.28)]
            "
          >
            <FiMusic className="text-[17px]" />
          </div>

          <div className="leading-none">
            <span className="text-[19px] font-extrabold tracking-[-0.04em] text-white">
              We<span className="text-accent">Music</span>
            </span>

            <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.22em] text-neutral-600">
              Music Together
            </p>
          </div>
        </NavLink>

        {/* Mobile Close */}
        <button
          onClick={onClose}
          className="
            flex items-center justify-center
            text-neutral-500
            transition-colors
            hover:text-white
            lg:hidden
          "
          aria-label="Close sidebar"
        >
          <FiX size={22} />
        </button>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="shrink-0 px-3 sm:px-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
          Menu
        </p>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              end={item.to === "/"}
              className={({ isActive }) =>
                `
                group relative flex h-11 items-center gap-4
                rounded-xl px-3
                text-sm font-medium
                transition-all duration-300
                ${
                  isActive
                    ? "bg-white/[0.075] text-white"
                    : "text-neutral-400 hover:bg-white/[0.035] hover:text-white"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                      className="
                        absolute
                        left-0
                        top-2
                        bottom-2
                        w-[3px]
                        rounded-full
                        bg-accent
                        shadow-glowsm
                      "
                    />
                  )}

                  <item.icon
                    size={19}
                    className={`
                      shrink-0 transition-all duration-300
                      ${
                        isActive
                          ? "text-accent"
                          : "text-neutral-500 group-hover:text-neutral-200"
                      }
                    `}
                  />

                  <span>{item.label}</span>

                  {isActive && (
                    <FiChevronRight className="ml-auto text-xs text-neutral-600" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ================= DIVIDER ================= */}
      <div className="mx-6 my-6 h-px shrink-0 bg-white/[0.055]" />

      {/* ================= NEW PLAYLIST ================= */}
      <div className="shrink-0 px-5 sm:px-6">
        <button
          type="button"
          className="
            group flex w-full items-center gap-3
            rounded-xl px-2.5 py-2
            text-sm text-neutral-400
            transition-all duration-300
            hover:bg-white/[0.035]
            hover:text-white
          "
        >
          <span
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg
              border border-white/[0.07]
              bg-white/[0.025]
              transition-all duration-300
              group-hover:border-accent/30
              group-hover:bg-accent/10
            "
          >
            <FiPlusCircle
              size={17}
              className="text-neutral-500 transition-colors group-hover:text-accent"
            />
          </span>

          <span>New Playlist</span>
        </button>
      </div>

      {/* ================= PLAYLISTS ================= */}
      <div className="mt-6 flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between px-6 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
            Your Playlists
          </p>

          <span className="text-[10px] text-neutral-700">
            {playlists.length}
          </span>
        </div>

        <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-3 pb-5 sm:px-4">
          <div className="space-y-1">
            {playlists.map((p) => (
              <NavLink
                key={p.id}
                to={`/playlist/${p.id}`}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  group flex items-center gap-3
                  rounded-xl px-2.5 py-2
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-white/[0.06]"
                      : "hover:bg-white/[0.035]"
                  }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className="
                        relative h-9 w-9 shrink-0 overflow-hidden
                        rounded-lg
                        bg-white/[0.05]
                      "
                    >
                      <img
                        src={p.cover}
                        alt={p.title}
                        className="
                          h-full w-full object-cover
                          transition-transform duration-500
                          group-hover:scale-110
                        "
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    <span
                      className={`
                        min-w-0 flex-1 truncate text-sm transition-colors
                        ${
                          isActive
                            ? "font-medium text-white"
                            : "text-neutral-400 group-hover:text-neutral-100"
                        }
                      `}
                    >
                      {p.title}
                    </span>

                    {isActive && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-glowsm" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM USER AREA ================= */}
      <div className="relative shrink-0 border-t border-white/[0.055] p-4">

        <div className="pointer-events-none absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-[#080909] to-transparent" />

        {/* Profile */}
        <button
          type="button"
          onClick={() => {
            navigate("/profile");
            onClose();
          }}
          className="
            relative z-10
            flex w-full items-center gap-3
            rounded-xl px-2 py-2
            text-left
            transition-colors
            hover:bg-white/[0.035]
          "
        >
          {/* Avatar */}
          <div
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-full
              bg-gradient-to-br from-accent to-emerald-700
              text-sm font-bold text-black
              shadow-glowsm
            "
          >
            {initials}
          </div>

          {/* User */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              {user?.name || "WeMusic User"}
            </p>

            <p className="mt-0.5 truncate text-[10px] text-neutral-600">
              {user?.email || "Free Account"}
            </p>
          </div>

          <FiUser
            size={15}
            className="shrink-0 text-neutral-600 transition-colors group-hover:text-accent"
          />
        </button>

        {/* Logout */}
        {user && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="
              relative z-10
              mt-1 flex w-full items-center gap-3
              rounded-xl px-2.5 py-2
              text-xs text-neutral-500
              transition-all duration-300
              hover:bg-red-500/[0.06]
              hover:text-red-400
            "
          >
            <FiLogOut size={15} />
            <span>Sign out</span>
          </motion.button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}
      <aside
        className="
          fixed left-0 top-0 z-40
          hidden h-dvh w-[260px]
          flex-col
          overflow-hidden
          border-r border-white/[0.055]
          bg-[#080909]
          lg:flex
        "
      >
        {content}
      </aside>

      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="
                fixed inset-0
                z-40
                bg-black/70
                backdrop-blur-sm
                lg:hidden
              "
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 32,
              }}
              className="
                fixed left-0 top-0 z-50
                h-dvh w-[280px]
                overflow-hidden
                border-r border-white/[0.055]
                bg-[#080909]
                sm:w-72
                lg:hidden
              "
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}