/** @type {import('tailwindcss').Config} */

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
        /**
         * Primary color
         */
        primary: "#4364CD",
        /**
         * Primary color when focused
         */
        "primary-focus": "#2E4CAD",
        /**
         * Foreground content color to use on primary color
         */
        "primary-content": "#FFF",
        /**
         * Base color of page, used for blank backgrounds
         */
        "base-100": "#F7F9FE",
        /**
         * Base color, darker
         */
        "base-200": "#dee0e5",
        /**
         * Base color, darker
         */
        "base-300": "#c6c7cb",
        /**
         * Base color, darker
         */
        "base-400": "#adaeb2",
        /**
         * Foreground content color to use on base color
         */
        "base-content": "#000",
        /**
         * Error color
         */
        error: "#dc2626",
        /**
         * Error color when focused
         */
        "error-focus": "#b91c1c",
        /**
         * Foreground content color to use on error color
         */
        "error-content": "#fef2f2",
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
