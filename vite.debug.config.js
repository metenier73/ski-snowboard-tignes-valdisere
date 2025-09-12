import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    open: true,
    host: true,
    strictPort: true,
    hmr: false,
    watch: {
      usePolling: true,
      interval: 100
    },
    fs: {
      strict: true,
    },
  },
  clearScreen: false,
  logLevel: 'info',
  build: {
    sourcemap: false,
    minify: false,
  },
  optimizeDeps: {
    force: true,
  },
  define: {
    'process.env': {}
  }
});
