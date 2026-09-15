import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import AuthPanel from "../components/AuthPanel";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check password length
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Check passwords match
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    // Check if an account already exists
    const existingAccount = localStorage.getItem("wemusic-account");

    if (existingAccount) {
      try {
        const account = JSON.parse(existingAccount);

        if (
          account.email.toLowerCase() === form.email.toLowerCase()
        ) {
          setError("An account with this email already exists.");
          return;
        }
      } catch {
        localStorage.removeItem("wemusic-account");
      }
    }

    // Save account
    const account = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    localStorage.setItem(
      "wemusic-account",
      JSON.stringify(account)
    );

    // Go to sign in
    navigate("/signin", {
      replace: true,
      state: {
        message: "Account created successfully. Please sign in.",
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-base overflow-x-hidden">
      <AuthPanel
        heading="Start listening."
        body="Create a free account to save playlists, like songs and follow the artists you love."
      />

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
        className="flex flex-1 items-center justify-center px-6 sm:px-10 py-12"
      >
        <div className="w-full max-w-sm">

          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="h-3 w-3 rounded-full bg-accent shadow-glowsm" />

            <span className="text-lg font-bold tracking-tight text-white">
              WeMusic
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Create your account
          </h1>

          <p className="text-neutral-400 text-sm mb-8">
            Already have one?{" "}
            <Link
              to="/signin"
              className="text-accent hover:underline"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
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
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-card text-sm text-white placeholder-neutral-500 rounded-full pl-11 pr-4 py-3 outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

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
                  className="w-full bg-card text-sm text-white placeholder-neutral-500 rounded-full pl-11 pr-4 py-3 outline-none focus:ring-1 focus:ring-accent"
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
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className="w-full bg-card text-sm text-white placeholder-neutral-500 rounded-full pl-11 pr-11 py-3 outline-none focus:ring-1 focus:ring-accent"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm"
                className="block text-xs text-neutral-400 mb-2"
              >
                Confirm password
              </label>

              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  size={16}
                />

                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full bg-card text-sm text-white placeholder-neutral-500 rounded-full pl-11 pr-11 py-3 outline-none focus:ring-1 focus:ring-accent"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  aria-label={
                    showConfirm
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirm ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400 px-2"
              >
                {error}
              </motion.p>
            )}

            {/* Terms */}
            <label className="flex items-start gap-2 text-xs text-neutral-400 cursor-pointer pt-1">
              <input
                type="checkbox"
                required
                className="accent-accent h-3.5 w-3.5 rounded mt-0.5"
              />

              <span>
                I agree to the Terms of Service and Privacy Policy.
              </span>
            </label>

            {/* Submit */}
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-accent text-black text-sm font-semibold rounded-full py-3 shadow-glowsm mt-2"
            >
              Create account
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

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-card hover:bg-cardhover text-sm text-white rounded-full py-3 transition-colors"
            >
              <FcGoogle size={16} />
              Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-card hover:bg-cardhover text-sm text-white rounded-full py-3 transition-colors"
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