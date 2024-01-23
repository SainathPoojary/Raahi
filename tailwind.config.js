/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4D39FF',
        background: '#FFFFFF',
      },
    },
  },
  plugins: [],
  fontFamily: {fontName: 'Poppins-Medium'},
};
