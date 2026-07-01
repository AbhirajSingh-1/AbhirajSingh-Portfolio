import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    // Split vendor chunks so the main bundle stays small
    rollupOptions: {
      output: {
        manualChunks: {
          // React core in its own chunk — very cacheable
          'vendor-react': ['react', 'react-dom'],
          // Framer-motion is large (~150KB) — isolate it
          'vendor-motion': ['framer-motion'],
          // Icons — loaded only when needed
          'vendor-icons': ['lucide-react'],
          // EmailJS — only used in Contact section
          'vendor-email': ['@emailjs/browser'],
        },
      },
    },
    // Raise warning threshold slightly (framer-motion is inherently large)
    chunkSizeWarningLimit: 600,
  },
})