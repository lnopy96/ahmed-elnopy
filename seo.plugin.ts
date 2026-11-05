import type { Plugin } from 'vite'
import { content } from './src/data/content.ts'

/**
 * Injects SEO/OG/Twitter meta and JSON-LD from content.ts, and emits robots.txt + sitemap.xml.
 * The absolute site URL comes from SITE_URL, or Vercel's VERCEL_PROJECT_PRODUCTION_URL at build time.
 */
export function seo(base = '/'): Plugin {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const siteUrl = (process.env.SITE_URL || (vercel ? `https://${vercel}` : '')).replace(/\/$/, '')
  const abs = (path: string) => `${siteUrl}${path}`
  const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const { seo: s, identity, experience, education } = content

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: identity.name,
    jobTitle: identity.title,
    email: `mailto:${identity.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Abu Dhabi', addressCountry: 'AE' },
    sameAs: [identity.linkedin],
    knowsAbout: s.knowsAbout,
    worksFor: { '@type': 'Organization', name: experience.find((j) => j.current)?.company },
    alumniOf: education
      .filter((e) => e.kind === 'degree')
      .map((e) => ({ '@type': 'CollegeOrUniversity', name: e.issuer })),
    ...(siteUrl && { url: siteUrl + '/', image: abs(identity.photo ?? s.ogImage) }),
  }

  const meta = [
    `<meta name="description" content="${esc(s.description)}" />`,
    `<meta name="author" content="${esc(identity.name)}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:title" content="${esc(s.title)}" />`,
    `<meta property="og:description" content="${esc(s.description)}" />`,
    `<meta property="og:image" content="${abs(s.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(s.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(s.title)}" />`,
    `<meta name="twitter:description" content="${esc(s.description)}" />`,
    `<meta name="twitter:image" content="${abs(s.ogImage)}" />`,
    ...(siteUrl
      ? [`<link rel="canonical" href="${siteUrl}/" />`, `<meta property="og:url" content="${siteUrl}/" />`]
      : []),
    `<link rel="manifest" href="${base}site.webmanifest" />`,
    `<link rel="preload" as="image" href="${base}images/profile-480.webp" imagesrcset="${base}images/profile-480.webp 480w, ${base}images/profile-640.webp 640w, ${base}images/profile.webp 768w" imagesizes="(min-width: 768px) 384px, 90vw" fetchpriority="high" />`,
    `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')

  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html
        .replace(/<title>.*<\/title>/, `<title>${esc(s.title)}</title>\n    ${meta}`)
    },
    generateBundle() {
      if (!siteUrl) this.warn('SITE_URL not set: sitemap.xml and absolute OG URLs are skipped.')
      this.emitFile({
        type: 'asset',
        fileName: 'site.webmanifest',
        source: JSON.stringify(
          {
            name: identity.name,
            short_name: identity.initials,
            description: s.description,
            start_url: base,
            scope: base,
            display: 'standalone',
            background_color: '#070B14',
            theme_color: '#070B14',
            icons: [
              { src: `${base}apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
              { src: `${base}favicon.svg`, sizes: 'any', type: 'image/svg+xml' },
            ],
          },
          null,
          2,
        ),
      })
      this.emitFile({ type: 'asset', fileName: '404.html', source: notFoundPage(base, identity.name) })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
      })
      if (siteUrl) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n  </url>\n</urlset>\n`,
        })
      }
    },
  }
}

/** Standalone 404 page in the site's dark theme; GitHub Pages serves it for unknown paths. */
function notFoundPage(base: string, name: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Page not found · ${name}</title>
    <link rel="icon" type="image/svg+xml" href="${base}favicon.svg" />
    <style>
      :root { color-scheme: dark; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 16px; box-sizing: border-box;
        background: #070b14; color: #e8ecf4; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; text-align: center; }
      p.code { margin: 0; color: #f5a524; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; }
      h1 { margin: 12px 0 8px; font-size: clamp(28px, 6vw, 44px); }
      p { margin: 0 0 28px; color: #8a96ad; }
      a { display: inline-block; border-radius: 999px; background: #f5a524; color: #070b14; padding: 12px 22px;
        font-weight: 600; text-decoration: none; }
      a:hover { background: #ffc861; }
      a:focus-visible { outline: 2px solid #f5a524; outline-offset: 3px; }
    </style>
  </head>
  <body>
    <main>
      <p class="code">404</p>
      <h1>This page doesn\u2019t exist.</h1>
      <p>The link may be old or mistyped.</p>
      <a href="${base}">Back to ${name}</a>
    </main>
  </body>
</html>
`
}
