/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        japan: ["Noto Serif JP", "serif"],
      },
      colors: {
        primary: "#B22222", // Japon kırmızısı
        secondary: "#F5F5DC", // Bej tonu
      },
    },
  },
  plugins: [],
};
