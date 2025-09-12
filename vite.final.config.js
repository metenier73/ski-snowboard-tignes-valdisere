import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Désactiver complètement les source maps et le HMR
process.env.VITE_DISABLE_SOURCEMAP = 'true';
process.env.VITE_FAST_REFRESH = 'false';

export default defineConfig({
  plugins: [
    react({
      // Désactiver le Fast Refresh et le HMR
      fastRefresh: false,
      // Désactiver les source maps dans React
      babel: {
        sourceMaps: false,
        compact: false
      }
    })
  ],
  server: {
    port: 4000,
    open: true,
    host: '0.0.0.0',
    strictPort: true,
    // Désactiver le HMR
    hmr: false,
    // Désactiver le rechargement automatique
    watch: {
      usePolling: false,
      ignored: ['**/node_modules/**', '**/.git/**']
    },
    // Désactiver les logs de HMR
    logLevel: 'warn',
    // Désactiver les erreurs en plein écran
    overlay: false
  },
  build: {
    // Désactiver les source maps
    sourcemap: false,
    // Désactiver les commentaires
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
    // Désactiver les source maps dans les chunks
    rollupOptions: {
      output: {
        sourcemap: false,
      },
    },
  },
  // Désactiver les logs de source maps manquants
  logLevel: 'warn',
  // Désactiver les erreurs en plein écran
  clearScreen: false,
  // Configuration d'esbuild
  esbuild: {
    sourcemap: false,
    minify: true,
    target: 'es2020',
  },
  // Désactiver les optimisations qui pourraient causer des problèmes
  optimizeDeps: {
    include: [],
    exclude: ['@babel/runtime'],
    esbuildOptions: {
      // Désactiver les source maps dans esbuild
      sourcemap: false,
    },
  },
  // Désactiver les fonctionnalités expérimentales
  experimental: {
    renderBuiltUrl: undefined,
  },
});
