import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: [
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') }
    ]
  }
})
