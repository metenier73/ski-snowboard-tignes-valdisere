import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [react()],
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
      sourcemap: false, // Désactive complètement les sourcemaps
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [], // Supprime les logs en production
      sourcemap: false, // Désactive les sourcemaps esbuild
    },
    server: {
      port: 5173,
      strictPort: true,
      open: false,
      sourcemapIgnoreList: true, // Ignore les source maps en développement
    },
    preview: {
      port: 4173,
      strictPort: true,
      open: false
    }
  }
})
