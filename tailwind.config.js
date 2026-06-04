/** @type {import('tailwindcss').Config} */
// Tailwind v4 resolves the theme from `@theme` in app/globals.css.
// This file only declares dark-mode strategy and content sources.
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
