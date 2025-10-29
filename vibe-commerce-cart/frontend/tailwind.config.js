/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C63FF',
          dark: '#5146ff',
        },
        accent: '#22d3ee',
      },
    },
  },
  darkMode: 'media',
  plugins: [],
};


