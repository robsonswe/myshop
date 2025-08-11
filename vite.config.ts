import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/myshop/', // This fixes the GitHub Pages asset path issue
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})