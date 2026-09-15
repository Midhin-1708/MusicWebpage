import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import AuthPanel from "../components/AuthPanel";
import { useAuth } from "../context/AuthContext";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(
    location.state?.message || ""
  );

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const savedAccount = localStorage.getItem("wemusic-account");

    if (!savedAccount) {
      setError("No account found. Please create an account first.");
      return;
    }

    try {
      const account = JSON.parse(savedAccount);

      if (
        account.email.toLowerCase() !== form.email.trim().toLowerCase() ||
        account.password !== form.password
      ) {
        setError("Invalid email or password.");
        return;
      }

      login({
        name: account.name,
        email: account.email,
      });

      const from = location.state?.from || "/";

      navigate(from, { replace: true });
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-base overflow-x-hidden">

      {/* Auth Panel */}
      <AuthPanel
        heading="Welcome back."
        body="Sign in to pick up your playlists, liked songs and queue right where you left them."
      />

      {/* Main Content */}
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
        className="flex flex-1 items-center justify-center px-6 sm:px-10 py-12"
      >
        <div className="w-full max-w-sm">

          {/* Mobile Logo */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="h-3 w-3 rounded-full bg-accent shadow-glowsm" />

            <span className="text-lg font-bold tracking-tight text-white">
              WeMusic
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Sign in
          </h1>

          <p className="text-neutral-400 text-sm mb-8">
            New here?{" "}
            <Link
              to="/signup"
              className="text-accent hover:underline"
            >
              Create an account
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
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
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="
                    w-full bg-card
                    text-sm text-white
                    placeholder-neutral-500
                    rounded-full
                    pl-11 pr-4 py-3
                    outline-none
                    focus:ring-1 focus:ring-accent
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs text-neutral-400 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  size={16}
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="
                    w-full bg-card
                    text-sm text-white
                    placeholder-neutral-500
                    rounded-full
                    pl-11 pr-11 py-3
                    outline-none
                    focus:ring-1 focus:ring-accent
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="
                    absolute right-4 top-1/2
                    -translate-y-1/2
                    text-neutral-500
                    hover:text-white
                    transition-colors
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  rounded-xl
                  border border-accent/20
                  bg-accent/5
                  px-4 py-3
                  text-xs text-accent
                "
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-black">
                    ✓
                  </span>

                  <span>{success}</span>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  rounded-xl
                  border border-red-500/20
                  bg-red-500/5
                  px-4 py-3
                  text-xs text-red-400
                "
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500/10 text-[9px] font-bold">
                    !
                  </span>

                  <span>{error}</span>
                </div>
              </motion.div>
            )}

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-accent h-3.5 w-3.5 rounded"
                />

                Remember me
              </label>

              <button
                type="button"
                className="text-neutral-400 hover:text-accent transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In */}
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="
                w-full
                bg-accent
                text-black
                text-sm
                font-semibold
                rounded-full
                py-3
                shadow-glowsm
                mt-2
                transition-all
              "
            >
              Sign in
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <span className="h-px flex-1 bg-neutral-800" />

            <span className="text-xs text-neutral-500">
              or continue with
            </span>

            <span className="h-px flex-1 bg-neutral-800" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              className="
                flex items-center justify-center gap-2
                bg-card
                hover:bg-cardhover
                text-sm text-white
                rounded-full
                py-3
                transition-colors
              "
            >
              <FcGoogle size={16} />
              Google
            </button>

            <button
              type="button"
              className="
                flex items-center justify-center gap-2
                bg-card
                hover:bg-cardhover
                text-sm text-white
                rounded-full
                py-3
                transition-colors
              "
            >
              <FaApple size={16} />
              Apple
            </button>

          </div>
        </div>
      </motion.div>
    </div>
  );
}