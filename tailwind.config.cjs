/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(-10deg)", translate: "-0.5rem" },
          "50%": { transform: "rotate(10deg)", translate: "0.5rem" },
          "100%": { transform: "rotate(-10deg)", translate: "-0.5rem" },
        },
        loader: {
          "0%": {
            scale: "100%",
            transform: "rotate(0deg)",
            filter: "drop-shadow(5px 5px 5px black)",
          },
          "50%": {
            scale: "300%",
            transform: "rotate(180deg)",
            filter: "drop-shadow(-15px -15px 15px black)",
          },
          "100%": {
            scale: "100%",
            transform: "rotate(360deg)",
            filter: "drop-shadow(5px 5px 5px black)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        loader: "loader 3s linear infinite",
      },
    },
  },
  plugins: [],
};
