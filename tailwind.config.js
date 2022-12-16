/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#603BAD",
        purplePale: "#DFD8EF",
        purpleDark: "#3A2368",
        lightpurple: "#BFB1DE",
        red: "#DC2626",
        redPale: "#F8D4D4",
        redDark: "#841717",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      boxShadow: {
        bottomRight: "4px 4px 0px 0px rgba(88, 168, 92, 1)",
        bottomRightDarker: "4px 4px 0px 0px rgba(5, 96, 3, 1)",
        bottomRightCard: "5px 4px 0px 2px rgba(0, 0, 0, 0.8)",
      },
      gridTemplateRows: {
        custom: "1fr 11fr",
      },
      backdropBlur: {
        xs: "1.5px",
      },
    },
  },
  plugins: [],
};
