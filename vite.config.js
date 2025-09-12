import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Désactiver les source maps côté client
process.env.VITE_DISABLE_SOURCEMAP = 'true';

export default defineConfig({
  plugins: [react({
    // Réactive le Fast Refresh pour le débogage
    fastRefresh: true,
  })],
  // Ignorer les avertissements de source maps manquants
  optimizeDeps: {
    exclude: ['@babel/runtime'],
    esbuildOptions: {
      target: 'es2020',
      // Ignorer les erreurs de source maps manquants
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  },
  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
    // Configuration du HMR (Hot Module Replacement)
    hmr: {
      host: 'localhost',
      port: 3000,
      protocol: 'ws',
      overlay: false, // Désactive l'overlay d'erreur HMR
    },
    // Configuration du système de fichiers
    fs: {
      allow: ['..'], // Permet d'accéder aux fichiers en dehors de la racine du projet
      strict: false, // Désactive les restrictions strictes sur les imports
    },
    // Configuration CORS pour le développement
    cors: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Désactiver complètement les source maps
    sourcemap: false,
    // Désactive les commentaires de sourcemap dans les fichiers de production
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
    // Configuration pour les ressources statiques
    assetsInlineLimit: 0, // Force l'inclusion des fichiers dans le bundle
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Alias pour le dossier public
      '/public': path.resolve(__dirname, './public')
    }
  },
  // Active les logs de débogage
  logLevel: 'info',
  // Configuration pour les assets
  publicDir: 'public',
  // Configuration CSS
  css: {
    devSourcemap: true,
    modules: {
      scopeBehaviour: 'local',
    },
  },
  // Configuration pour le développement
  define: {
    'process.env': {},
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  },
  // Désactive la minification pour le débogage
  esbuild: {
    minify: false,
  },
  // Configuration pour le rechargement à chaud
  optimizeDeps: {
    include: ['react', 'react-dom'],
    force: true,
  },
});
