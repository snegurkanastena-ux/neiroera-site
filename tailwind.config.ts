import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        text: "rgb(var(--text-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        border: "rgb(var(--border-rgb) / <alpha-value>)",
        accent: "#5EE7FF",
        accent2: "#9B7DFF",
        warm: "#F3C9B6",
        onAccent: "#020617"
      },
      boxShadow: {
        glow: "0 0 28px rgba(94, 231, 255, 0.42)",
        "glow-soft": "0 0 48px rgba(155, 125, 255, 0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;
