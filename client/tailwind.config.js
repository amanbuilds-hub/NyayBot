/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1a2744',
        'navy-light': '#2d3f6b',
        saffron: '#FF9933',
        'saffron-light': '#FFF3E0'
      }
    },
  },
  plugins: [],
}
