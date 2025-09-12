import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration minimale sans PWA
// Pour activer la PWA plus tard, installez 'vite-plugin-pwa' et ajoutez-le aux plugins

export default defineConfig({
  plugins: [
    react(),
    // VitePWA() sera ajouté ici plus tard
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
});
