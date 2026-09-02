import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Permite que funcione perfectamente en GitHub Pages en cualquier subdirectorio
  server: {
    port: 5173,
    host: true
  }
});
