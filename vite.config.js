import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: isSsrBuild ? {} : {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          carousel: ['embla-carousel-react', 'embla-carousel-autoplay']
        }
      }
    }
  }
}))
