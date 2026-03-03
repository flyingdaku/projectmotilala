/** @type {import('tailwindcss').Config} */
const config = {
  presets: [require("nativewind/preset")],
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // IndiaQuant brand palette
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316", // Primary orange (India flag saffron-adjacent)
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        // Semantic finance colors
        gain: {
          DEFAULT: "#16a34a", // Green for positive returns
          light: "#dcfce7",
        },
        loss: {
          DEFAULT: "#dc2626", // Red for negative returns
          light: "#fee2e2",
        },
        neutral: {
          DEFAULT: "#6b7280",
          light: "#f3f4f6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
        display: ["Cal Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

module.exports = config;
