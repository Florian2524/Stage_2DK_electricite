import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: true,
    strictPort: true,
    port: Number(process.env.VITE_PORT) || 5173,
    hmr: {
      host: 'localhost',
      port: Number(process.env.VITE_PORT) || 5173,
      protocol: 'ws',
    },
    // 🔥 clé pour WSL/Windows + Docker
    watch: { usePolling: true, interval: 300 },
  },
})
