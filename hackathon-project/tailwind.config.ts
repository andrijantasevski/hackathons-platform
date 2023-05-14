/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
import colors from "tailwindcss/colors";

module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}", "./src/layouts/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-50": "#8ea2e1",
        primary: "#4364CD",
        "primary-100": "#3c5ab9",
        secondary: "#FFFFFF",
        success: { ...colors.green },
        warning: { ...colors.yellow },
        error: { ...colors.red },
        fruit: "#FFE1D3",
        gradientPrimary: "#0F2877",
        gradientWarning: "#9EFFE8",
        gradientError: "#D8C0FF",
        gradientFruit: "#FFCFBA",
      },
      fontFamily: {
        sans: ["Verdana", ...defaultTheme.fontFamily.sans],
      },

      backgroundImage: {
        cloud: "url('/images/Cloud.svg')",
        brainster: "url('/icons/Brainster-Logo1.svg')",
        scidev: "url('/icons/LogoSCiDEV1.svg')",
      },
    },
  },
  plugins: [],
};
