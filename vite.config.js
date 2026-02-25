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
            // Intercepte toutes les requêtes de fichiers .map
            if (req.url && (
              req.url.endsWith('.map') ||
              req.url.includes('react_devtools_backend') ||
              req.url.includes('installHook') ||
              req.url.includes('source-map') ||
              req.url.includes('chunk-') && req.url.endsWith('.map')
            )) {
              res.writeHead(200, { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Access-Control-Allow-Origin': '*'
              })
              // Retourne un source map valide avec au moins une source vide pour éviter l'erreur "No sources"
              res.end(JSON.stringify({
                version: 3,
                sources: [''],
                names: [],
                mappings: '',
                file: req.url.replace('.map', '').split('/').pop()
              }))
              return
            }
            
            // Intercepte les requêtes vers metenier73.github.io pour les rediriger vers localhost
            if (req.url && req.url.includes('metenier73.github.io')) {
              console.log(`Intercepted request to: ${req.url}`)
              // Retourne une réponse vide ou redirige vers une ressource locale
              if (req.url.includes('favicon.ico')) {
                // Servir le favicon local
                const fs = require('fs')
                const path = require('path')
                const faviconPath = path.join(__dirname, 'public', 'favicon.ico')
                if (fs.existsSync(faviconPath)) {
                  res.writeHead(200, { 'Content-Type': 'image/x-icon' })
                  res.end(fs.readFileSync(faviconPath))
                  return
                }
              }
              // Pour les autres requêtes, retourner 404 silencieusement
              res.writeHead(404)
              res.end()
              return
            }
            
            next()
          })
        },
        // Hook pour transformer les réponses de source maps
        transformIndexHtml(html) {
          return html
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
    // Optimisation des dépendances pour éviter les problèmes de chargement
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-dev-runtime',
        'lucide-react',
        '@radix-ui/react-tabs',
        '@radix-ui/react-slot',
        'class-variance-authority',
        'tailwind-merge',
        'clsx',
        'react-day-picker'
      ],
      esbuildOptions: {
        sourcemap: false,
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false, // Désactive complètement les sourcemaps
      rollupOptions: {
        output: {
          // Ne pas générer de source maps même pour le debug
          sourcemap: false,
        },
      },
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
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        // CSP très permissive en développement pour éviter les blocages
        'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http:; script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; style-src 'self' 'unsafe-inline' data: blob:; img-src 'self' data: blob: https: http:; font-src 'self' data: blob: https: http:; connect-src 'self' data: blob: https: http: ws: wss:; media-src 'self' data: blob: https: http:; object-src 'none'; base-uri 'self'; form-action 'self';",
        // Cache control pour éviter les problèmes de cache
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
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
