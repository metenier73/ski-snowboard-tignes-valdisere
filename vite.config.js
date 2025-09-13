import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Désactiver les source maps côté client
process.env.VITE_DISABLE_SOURCEMAP = 'true';

// https://vitejs.dev/config/
export default defineConfig({
  // Définit le chemin de base pour le déploiement sur GitHub Pages
  base: '/ski-snowboard-tignes-valdisere/',
  plugins: [react({
    // Réactive le Fast Refresh pour le débogage
    fastRefresh: true,
  })],
  // Configuration pour optimiser les dépendances
  optimizeDeps: {
    exclude: ['@babel/runtime'],
    include: ['react', 'react-dom'],
    force: true,
    esbuildOptions: {
      target: 'es2020',
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  },
  // Configuration d'esbuild
  esbuild: {
    sourcemap: false,
    minify: false, // Désactive la minification pour le débogage
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
    // Configuration du proxy pour l'API Open-Meteo
    proxy: {
      '/api/weather': {
        target: 'https://api.open-meteo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weather/, '/v1/forecast'),
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Configuration pour éviter les problèmes de hachage des noms de fichiers
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
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
});
