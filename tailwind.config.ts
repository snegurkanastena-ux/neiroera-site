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
        accent: "#37E6FF",
        accent2: "#8B5CFF",
        warm: "#F3C9B6",
        onAccent: "#020617"
      },
      boxShadow: {
        glow: "0 0 24px rgba(55, 230, 255, 0.35)"
      }
    }
  },
  plugins: []
} satisfies Config;
