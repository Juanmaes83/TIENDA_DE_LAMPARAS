/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#0a0a0a',
          900: '#141414',
          800: '#1f1f1f',
        },
        amber: {
          300: '#fcd34d',
          700: '#b45309',
        },
      },
      fontFamily: {
        headline: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
