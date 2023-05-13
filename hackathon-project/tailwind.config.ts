/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
import colors from "tailwindcss/colors";

module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Extend the global theme here with custom variables that you can access across the whole app
    extend: {
      // Add global colors here
      colors: {
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
      fontSize: {
        sm: [
          "12px",
          {
            lineHeight: "16px",
          },
        ],
        base: [
          "16px",
          {
            lineHeight: "16px",
          },
        ],
        lg: [
          "24px",
          {
            lineHeight: "16px",
          },
        ],
        xl: [
          "50px",
          {
            lineHeight: "61px",
          },
        ],
        xxl: [
          "55px",
          {
            lineHeight: "32px",
          },
        ],
        m: [
          "32px",
          {
            lineHeight: "42px",
          },
        ],
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
