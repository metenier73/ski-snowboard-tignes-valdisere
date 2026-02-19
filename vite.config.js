import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

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
            // Intercepte toutes les requêtes de fichiers .map (y compris react_devtools_backend_compact.js.map et installHook.js.map)
            if (req.url && (
              req.url.endsWith('.map') ||
              req.url.includes('react_devtools_backend') ||
              req.url.includes('installHook')
            )) {
              res.writeHead(200, { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
              })
              // Retourne un source map valide mais vide pour éviter les erreurs
              res.end(JSON.stringify({
                version: 3,
                sources: [],
                names: [],
                mappings: '',
                file: req.url.replace('.map', '')
              }))
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
    css: {
      postcss: './postcss.config.cjs',
      devSourcemap: false
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
      port: 5173, // Port par défaut restauré
      strictPort: false, // Permet d'utiliser un autre port si 5173 est occupé
      open: false,
      fs: {
        strict: false, // Permet d'ignorer certaines requêtes
      },
      // Configuration pour ignorer les erreurs de source maps
      hmr: {
        overlay: false, // Désactive l'overlay d'erreur pour les source maps
      },
      // En-têtes de sécurité uniquement (pas de Content-Type par défaut)
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      },
      // Middleware pour gérer les types MIME et l'encodage
      middlewareMode: false,
    },
    preview: {
      port: 4173,
      strictPort: true,
      open: false
    }
  }
})
