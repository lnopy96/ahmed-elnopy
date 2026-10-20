import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { seo } from './seo.plugin.ts'

// BASE_PATH is set by the GitHub Pages workflow ('/ahmed-elnopy/'); Vercel serves from '/'.
const base = process.env.BASE_PATH || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), seo(base)],
})
