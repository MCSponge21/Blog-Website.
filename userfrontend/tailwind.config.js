/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'drawing' : "url('/public/cool guy.jpg')",
        'blurry' : "url('/public/blurry.jpg')"
      }
    },
  },
  plugins: [],
}

