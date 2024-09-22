/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lemon: ['Lemon', 'cursive'], 
      },
      keyframes: {
        'spinner-wave': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
      animation: {
        'spinner-wave': 'spinner-wave 1s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
