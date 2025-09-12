// Configuration de débogage minimale pour Vite
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      host: 'localhost',
      port: 4000,
      protocol: 'ws',
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
    fs: {
      strict: false,
    },
  },
  clearScreen: false,
  logLevel: 'info',
  build: {
    sourcemap: true,
    minify: false,
  },
  optimizeDeps: {
    force: true,
  },
  define: {
    'process.env': {}
  }
});
