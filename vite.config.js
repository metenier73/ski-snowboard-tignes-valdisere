import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [
      react(),
      // Plugin pour intercepter les requêtes de source maps manquants et gérer l'encodage
      {
        name: 'encoding-handler',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            // Ne pas interférer avec les requêtes internes Vite
            if (req.url && (
              req.url.startsWith('/@vite/') || 
              req.url.startsWith('/@react-refresh') ||
              req.url.includes('node_modules') ||
              req.url.includes('.vite') ||
              req.url.includes('source-map')
            )) {
              return next()
            }
            
            // Intercepte les requêtes de fichiers .map et retourne une réponse vide appropriée
            if (req.url && req.url.endsWith('.map')) {
              res.writeHead(200, { 
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
              })
              res.end('{"version": 3, "sources": [], "names": [], "mappings": ""}')
              return
            }
            
            // N'ajouter les en-têtes d'encodage que pour les fichiers statiques spécifiques
            if (req.url && !req.url.includes('?')) {
              const url = req.url
              if (url.endsWith('.jsx') || url.endsWith('.js') || url.endsWith('.ts') || url.endsWith('.tsx')) {
                res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
              } else if (url.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css; charset=utf-8')
              } else if (url.endsWith('.html')) {
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
              } else if (url.endsWith('.json')) {
                res.setHeader('Content-Type', 'application/json; charset=utf-8')
              }
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
