/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'glow': 'glow 2s infinite ease-in-out',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
