import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '/@': path.resolve(__dirname, './src'),
    }
  },
  logLevel: 'info',
  base: '/',
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
