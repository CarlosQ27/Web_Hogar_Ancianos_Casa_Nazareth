import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: !isProduction ? {
        '/api': {
          target: 'https://localhost:7136', // Development backend
          changeOrigin: true,
          secure: false
        }
      } : undefined
    },
    preview: {
      port: 4173,
      https: true
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false
    }
  }
})
