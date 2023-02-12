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
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
