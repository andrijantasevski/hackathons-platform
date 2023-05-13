/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Extend the global theme here with custom variables that you can access across the whole app
    extend: {
      // Add global colors here
      colors: {
        primary: "#fff",
        secondary: "#fff",
        success: "#444",
        warning: "#151",
        error: "#125",
      },
    },
  },
  plugins: [],
};
