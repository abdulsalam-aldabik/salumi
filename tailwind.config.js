/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Primary Colors
        navy: "#1a1a3e",
        cyan: "#D5B977",
        
        primary: {
          DEFAULT: "#1a1a3e",
          dark: "#0f0f28",
          light: "#2d2d5a",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#D5B977",
          dark: "#c2a562",
          light: "#e0c88c",
          glow: "rgba(213, 185, 119, 0.3)",
          foreground: "#1a1a3e",
        },
        
        // Complete gray scale for dark mode
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
