import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        text: "rgb(var(--text-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        border: "rgb(var(--border-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        accent2: "rgb(var(--accent2-rgb) / <alpha-value>)",
        warm: "rgb(var(--warm-rgb) / <alpha-value>)",
        onAccent: "rgb(var(--on-accent-rgb) / <alpha-value>)"
      },
      boxShadow: {
<<<<<<< HEAD
        glow: "0 0 20px rgba(94, 231, 255, 0.22)",
        "glow-soft": "0 0 24px rgba(155, 125, 255, 0.12)"
=======
        glow: "0 0 36px rgb(var(--accent-rgb) / 0.38), 0 0 72px rgb(var(--accent2-rgb) / 0.12)",
        "glow-soft": "0 0 52px rgb(var(--accent2-rgb) / 0.2)",
        "card-hover": "0 0 48px rgb(var(--accent-rgb) / 0.14), 0 24px 48px rgb(0 0 0 / 0.35)"
>>>>>>> 9894876 (frontend update)
      }
    }
  },
  plugins: []
} satisfies Config;
