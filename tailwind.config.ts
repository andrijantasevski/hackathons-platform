/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
import colors from "tailwindcss/colors";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-50": "#8ea2e1",
        primary: "#4364CD",
        "primary-100": "#3c5ab9",
        success: { ...colors.green },
        warning: { ...colors.yellow },
        error: { ...colors.red },
      },
      fontFamily: {
        sans: ["Verdana", ...defaultTheme.fontFamily.sans],
      },

      backgroundImage: {
        cloud: "url('/images/background-images/background-cloud.svg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
