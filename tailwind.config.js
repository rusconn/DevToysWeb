/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: "#ffffff",
          150: "#f2f2f2",
          250: "#dcdcdc",
          350: "#bbbbbb",
          450: "#8b8b8b",
          550: "#626262",
          650: "#494949",
          750: "#323232",
          850: "#1f1f1f",
        },
      },
    },
  },
};
