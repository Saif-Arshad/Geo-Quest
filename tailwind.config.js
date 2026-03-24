/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#151D1A',
        secondary: '#1A4231',
        accent: '#C9A84C',
      },
    },
  },
  plugins: [],
}

