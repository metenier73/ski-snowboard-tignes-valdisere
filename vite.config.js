import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [
      react(),
      ViteImageOptimizer({
        png: { quality: 80 },
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        webp: { lossless: false, quality: 80 },
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: "École de Ski Tignes - Val d'Isère",
          short_name: "Ski Tignes",
          description: "Cours de ski et snowboard avec une monitrice diplômée sur le domaine de l'Espace Killy",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png"
            },
            {
              src: "/pwa-maskable-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "/pwa-maskable-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        }
      })
    ],
    base: '/ski-snowboard-tignes-valdisere/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      postcss: './postcss.config.cjs',
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isProduction, // Désactive les sourcemaps en production
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-*'],
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      minify: isProduction ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [], // Supprime les logs en production
    },
    server: {
      port: 5173,
      strictPort: true,
      open: false
    },
    preview: {
      port: 4173,
      strictPort: true,
      open: false
    }
  }
})
