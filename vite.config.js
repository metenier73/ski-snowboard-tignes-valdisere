import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [
      react(),
      // Plugin pour intercepter les requêtes de source maps manquants
      {
        name: 'ignore-source-map-errors',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            // Intercepte les requêtes de fichiers .map et retourne une réponse vide
            if (req.url && req.url.endsWith('.map')) {
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end('{}')
              return
            }
            next()
          })
        },
      },
    ],
    // Base path uniquement en production (pour GitHub Pages)
    base: isProduction ? '/ski-snowboard-tignes-valdisere/' : '/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Réduit les logs pour éviter les warnings de source maps
    logLevel: 'warn',
    // Désactive les source maps en développement pour éviter les erreurs
    optimizeDeps: {
      esbuildOptions: {
        sourcemap: false,
      },
    },
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
      legalComments: 'none', // Supprime les commentaires légaux
    },
    server: {
      port: 5173,
      strictPort: false, // Permet d'utiliser un autre port si 5173 est occupé
      open: false,
      fs: {
        strict: false, // Permet d'ignorer certaines requêtes
      },
      // Configuration pour ignorer les erreurs de source maps
      hmr: {
        overlay: false, // Désactive l'overlay d'erreur pour les source maps
      },
    },
    preview: {
      port: 4173,
      strictPort: true,
      open: false
    }
  }
})
