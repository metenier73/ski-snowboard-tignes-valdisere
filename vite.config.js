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
      sourcemap: isProduction, // Désactive les sourcemaps en production
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
