/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "custom-green": "#00FF00",
        "custom-red": "#FF0000",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
