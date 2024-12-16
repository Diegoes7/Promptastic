/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html', './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    boxShadow: {
      DEFAULT: '0 3px 0 #57a300',
      teal: '0 3px 0 #0F766E',
      yellow: '0 3px 0 #E49E00',
      blueGray: '0 3px 0 #475569',
      none: 'none',
    },
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
      },
      screens: {
        'xs': '450px',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}