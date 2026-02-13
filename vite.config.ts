import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/TIENDA_DE_LAMPARAS/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
