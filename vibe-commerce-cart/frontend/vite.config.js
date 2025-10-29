import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Allow overriding backend port via env: VITE_API_PORT=5001 npm run dev
const apiPort = process.env.VITE_API_PORT || 5000;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': `http://localhost:${apiPort}`,
    },
  },
});


