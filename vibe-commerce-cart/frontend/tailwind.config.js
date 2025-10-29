/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8',
        },
        accent: '#ec4899',
        success: '#10b981',
        warning: '#f59e0b',
      },
      boxShadow: {
        glow: '0 0 20px rgb(99 102 241 / 0.4)',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
};


