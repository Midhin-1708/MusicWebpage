import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLogOut,
  FiEdit3,
  FiMusic,
  FiHeart,
  FiList,
  FiX,
  FiCheck,
  FiCalendar,
  FiShield,
  FiHeadphones,
  FiClock,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "W";

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "September 2026";

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  const handleEdit = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
    });

    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    updateUser({
      name,
      email,
    });

    const savedAccount = localStorage.getItem("wemusic-account");

    if (savedAccount) {
      try {
        const account = JSON.parse(savedAccount);

        localStorage.setItem(
          "wemusic-account",
          JSON.stringify({
            ...account,
            name,
            email,
          })
        );
      } catch {
        // Ignore invalid account data
      }
    }

    setSuccess("Profile updated successfully.");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
    });

    setError("");
    setIsEditing(false);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.45 }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* =========================
          PAGE HEADER
      ========================== */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
          Account
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Your Profile
        </h1>

        <p className="text-sm text-neutral-400 mt-2">
          View and manage your personal WeMusic account details.
        </p>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-5 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-accent"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-black">
                <FiCheck size={12} />
              </span>

              <span>{success}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          MAIN PROFILE CARD
      ========================== */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-card p-6 sm:p-8 lg:p-10"
      >
        {/* Glow */}
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center gap-7">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="relative flex h-28 w-28 sm:h-32 sm:w-32 shrink-0 items-center justify-center rounded-full bg-accent shadow-glow"
          >
            <span className="text-4xl sm:text-5xl font-bold text-black">
              {initials}
            </span>

            {/* Online indicator */}
            <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-card bg-accent" />
          </motion.div>

          {/* User Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Premium Member
              </span>

              <span className="rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                Active
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white truncate">
              {user?.name || "WeMusic User"}
            </h2>

            <div className="flex items-center gap-2 mt-3 text-neutral-400">
              <FiMail size={16} />

              <span className="text-sm truncate">
                {user?.email || "No email available"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs text-neutral-500">
              <span className="flex items-center gap-2">
                <FiCalendar size={14} />
                Member since {memberSince}
              </span>

              <span className="flex items-center gap-2">
                <FiShield size={14} />
                Account verified
              </span>
            </div>
          </div>

          {/* Edit */}
          <button
            type="button"
            onClick={handleEdit}
            className="self-start lg:self-center flex items-center justify-center gap-2 rounded-full border border-neutral-700 px-5 py-3 text-sm text-white hover:border-accent hover:text-accent transition-all"
          >
            <FiEdit3 size={15} />
            Edit profile
          </button>
        </div>
      </motion.div>

      {/* =========================
          PROFILE STATISTICS
      ========================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        <StatCard
          icon={FiMusic}
          label="Liked Songs"
          value="0"
          description="Songs saved"
        />

        <StatCard
          icon={FiList}
          label="Playlists"
          value="0"
          description="Created playlists"
        />

        <StatCard
          icon={FiHeadphones}
          label="Listening"
          value="Active"
          description="Music activity"
        />

        <StatCard
          icon={FiClock}
          label="Status"
          value="Online"
          description="Currently active"
        />
      </div>

      {/* =========================
          PERSONAL INFORMATION
      ========================== */}
      <div className="mt-8">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.18em] text-accent mb-1">
            Personal information
          </p>

          <h2 className="text-lg font-semibold text-white">
            Account details
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DetailCard
            icon={FiUser}
            label="Full name"
            value={user?.name || "WeMusic User"}
          />

          <DetailCard
            icon={FiMail}
            label="Email address"
            value={user?.email || "No email available"}
          />

          <DetailCard
            icon={FiShield}
            label="Account type"
            value="WeMusic Member"
          />

          <DetailCard
            icon={FiCalendar}
            label="Member since"
            value={memberSince}
          />
        </div>
      </div>

      {/* =========================
          ACCOUNT SETTINGS
      ========================== */}
      <div className="mt-8">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.18em] text-accent mb-1">
            Settings
          </p>

          <h2 className="text-lg font-semibold text-white">
            Account preferences
          </h2>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-card overflow-hidden">
          <SettingRow
            icon={FiUser}
            title="Display name"
            value={user?.name || "WeMusic User"}
          />

          <SettingRow
            icon={FiMail}
            title="Email address"
            value={user?.email || "No email"}
            border
          />

          <SettingRow
            icon={FiShield}
            title="Account status"
            value="Active and verified"
            border
          />
        </div>
      </div>

      {/* =========================
          LOGOUT
      ========================== */}
      <div className="mt-8 mb-10">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-6 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all"
        >
          <FiLogOut size={17} />
          Sign out
        </button>
      </div>

      {/* =========================
          EDIT PROFILE MODAL
      ========================== */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-card p-6 sm:p-7 shadow-2xl"
            >
              {/* Modal Glow */}
              <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="relative flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
                    Account
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Edit profile
                  </h2>

                  <p className="text-sm text-neutral-500 mt-1">
                    Update your personal account details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  aria-label="Close edit profile"
                >
                  <FiX size={17} />
                </button>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500/10 text-[9px] font-bold">
                      !
                    </span>

                    <span>{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSave}
                className="relative space-y-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="profile-name"
                    className="block text-xs text-neutral-400 mb-2"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <FiUser
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                      size={16}
                    />

                    <input
                      id="profile-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      className="w-full bg-neutral-900 text-sm text-white placeholder-neutral-600 rounded-full pl-11 pr-4 py-3 outline-none border border-neutral-800 focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="profile-email"
                    className="block text-xs text-neutral-400 mb-2"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <FiMail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                      size={16}
                    />

                    <input
                      id="profile-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      autoComplete="email"
                      className="w-full bg-neutral-900 text-sm text-white placeholder-neutral-600 rounded-full pl-11 pr-4 py-3 outline-none border border-neutral-800 focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 rounded-full border border-neutral-700 px-5 py-3 text-sm text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
                  >
                    Cancel
                  </button>

                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black shadow-glowsm"
                  >
                    <FiCheck size={16} />
                    Save changes
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* =========================
   STAT CARD
========================== */

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-neutral-800 bg-card p-5"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
          <Icon className="text-accent" size={19} />
        </div>
      </div>

      <p className="mt-5 text-xs uppercase tracking-wider text-neutral-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-neutral-600">
        {description}
      </p>
    </motion.div>
  );
}

/* =========================
   DETAIL CARD
========================== */

function DetailCard({ icon: Icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-4 rounded-2xl border border-neutral-800 bg-card p-5"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900">
        <Icon className="text-accent" size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-neutral-500">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-white">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

/* =========================
   SETTING ROW
========================== */

function SettingRow({ icon: Icon, title, value, border }) {
  return (
    <div
      className={`flex items-center gap-4 p-5 ${
        border ? "border-t border-neutral-800" : ""
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900">
        <Icon className="text-neutral-400" size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-neutral-500">
          {title}
        </p>

        <p className="mt-1 truncate text-sm text-white">
          {value}
        </p>
      </div>
    </div>
  );
}