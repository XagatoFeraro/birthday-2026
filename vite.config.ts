import { defineConfig } from 'vite'

// Set VITE_BASE_PATH env var for GitHub Pages deployment.
// Local dev: leave unset (defaults to '/').
// GitHub Pages: set to '/your-repo-name/' in the Actions workflow.
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('gsap'))  return 'gsap'
          if (id.includes('lenis')) return 'lenis'
        },
      },
    },
  },
})
