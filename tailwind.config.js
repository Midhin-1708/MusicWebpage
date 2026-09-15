/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#090909",
        card: "#181818",
        cardhover: "#212121",
        accent: "#1ED760",
        accentdim: "#14a34a",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(30, 215, 96, 0.25)",
        glowsm: "0 0 20px rgba(30, 215, 96, 0.35)",
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at top, rgba(30,215,96,0.12), transparent 60%)",
      },
      keyframes: {
        spinslow: { to: { transform: "rotate(360deg)" } },
        eq: {
          "0%, 100%": { height: "20%" },
          "50%": { height: "100%" },
        },
        pulseglow: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(30,215,96,0.4)" },
          "50%": { boxShadow: "0 0 24px rgba(30,215,96,0.7)" },
        },
      },
      animation: {
        spinslow: "spinslow 8s linear infinite",
        eq1: "eq 0.9s ease-in-out infinite",
        eq2: "eq 1.2s ease-in-out infinite",
        eq3: "eq 0.7s ease-in-out infinite",
        eq4: "eq 1s ease-in-out infinite",
        pulseglow: "pulseglow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
