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
        "gradient-primary":
          "linear-gradient(154.29deg, #4364cd 0%, #0f2877 100%)",
        "gradient-green": "linear-gradient(180deg, #d5fff5 0%, #9effe8 100%)",
        "gradient-purple": "linear-gradient(180deg, #e6d7ff 0%, #d8c0ff 100%)",
        "gradient-orange": "linear-gradient(180deg, #ffe1d3 0%, #ffcfba 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
