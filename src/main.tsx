import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/space-grotesk/600.css'
import './styles/index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The build prerenders the page into #root (scripts/prerender.mjs); the dev server serves it empty.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
