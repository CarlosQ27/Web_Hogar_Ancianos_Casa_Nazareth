import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { ConfigEnv, UserConfig } from 'vite'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [react()],
    server: {
      port: 5174,
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
      https: true as any // Fix para el tipo
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false
    }
  }
})