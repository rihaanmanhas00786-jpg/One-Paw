import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@rollup/rollup-win32-arm64-msvc']
  },
  server: {
    host: true
  }
})