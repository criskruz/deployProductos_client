/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          950: "#17275c",
          900: "#0A1F3A",
        },
      },

      backgroundImage: {
        header: "url('/logo.jpg')",
      },
    },
  },
  plugins: [],
};
