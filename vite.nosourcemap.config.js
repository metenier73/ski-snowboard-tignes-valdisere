import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Désactiver complètement les source maps
process.env.VITE_DISABLE_SOURCEMAP = 'true';

export default defineConfig({
  plugins: [
    react({
      fastRefresh: false, // Désactiver le Fast Refresh
    })
  ],
  server: {
    port: 4000,
    open: true,
    host: '0.0.0.0',
    hmr: false, // Désactiver le HMR
  },
  build: {
    sourcemap: false, // Désactiver les source maps
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
  esbuild: {
    // Désactiver les source maps dans esbuild
    sourcemap: false,
  },
  // Désactiver les logs de source maps manquants
  logLevel: 'warn',
});
