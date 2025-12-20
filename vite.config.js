import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [react()],
    // Base path uniquement en production (pour GitHub Pages)
    base: isProduction ? '/ski-snowboard-tignes-valdisere/' : '/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Réduit les logs pour éviter les warnings de source maps
    logLevel: 'warn',
    css: {
      postcss: './postcss.config.cjs',
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false, // Désactive complètement les sourcemaps
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [], // Supprime les logs en production
      sourcemap: false, // Désactive les sourcemaps esbuild
    },
    server: {
      port: 5173,
      strictPort: false, // Permet d'utiliser un autre port si 5173 est occupé
      open: false,
      sourcemapIgnoreList: true, // Ignore les source maps en développement
      fs: {
        strict: false, // Permet d'ignorer certaines requêtes
      },
      // Désactive les erreurs de source maps manquants
      middlewareMode: false,
    },
    preview: {
      port: 4173,
      strictPort: true,
      open: false
    }
  }
})
