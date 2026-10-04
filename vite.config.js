import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    // فقط صفحه‌ی اصلی اسکن شود؛ فایل قدیمی داخل legacy نادیده گرفته شود
    entries: ['index.html']
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0'
    }
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
