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
