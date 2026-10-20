# Portfolio — Ahmed Gamal Elnopy

Personal portfolio site. Vite + React + TypeScript + Tailwind CSS v4 + motion.

See [PLAN.md](./PLAN.md) for the build plan.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run lint
```

## Editing content

All text, links, projects, stats and SEO copy live in **`src/data/content.ts`**.
Images live in `public/images/` (WebP). Project covers also need an `-800.webp`
variant next to the full image for phones.

The CV served by the "Download CV" buttons is `public/cv/Ahmed-Elnopy-CV.pdf`.

## Deploy

### GitHub Pages (automatic)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`
to **https://lnopy96.github.io/ahmed-elnopy/**. If the first run fails at "configure-pages",
open the repo's **Settings → Pages**, set **Source** to **GitHub Actions**, then re-run
the workflow from the **Actions** tab.

### Vercel (optional, ≈2 minutes)

1. Go to <https://vercel.com/new> and sign in with GitHub.
2. Import the `lnopy96/ahmed-elnopy` repository. Vercel detects Vite — keep the defaults
   (build `npm run build`, output `dist`) and click **Deploy**.
3. Every push to `main` redeploys automatically.

The build reads Vercel's production URL automatically to write the canonical link,
Open Graph URLs, `robots.txt` and `sitemap.xml`. If you add a custom domain, set an
environment variable `SITE_URL=https://your-domain.com` in the Vercel project
settings and redeploy.

## SEO

`seo.plugin.ts` injects the title, meta description, Open Graph / Twitter tags and
JSON-LD `Person` data from `content.ts` at build time, and emits `robots.txt` and
`sitemap.xml`. The share image is `public/og.png` (1200×630).
