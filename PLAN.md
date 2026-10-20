# Portfolio Build Plan — Ahmed Gamal Elnopy
Executor: Claude Code (Sonnet 5.5). One task = one session.
Start every session with: **"Read PLAN.md. Do Task N only. Stop and show me the result."**

---

## 0. Rules for Claude Code
- Content lives ONLY in `src/data/content.ts`. Components never hardcode text.
- Never invent numbers, projects, links or dates. Missing data → `TODO:` placeholder.
- Mobile-first. Test at 375px, 768px, 1280px.
- Respect `prefers-reduced-motion`. Semantic HTML, alt text, visible focus states.
- Inspired by the reference, NOT a copy: own palette, own copy, own layout details.
- Finish each task with `npm run build` passing + short summary of changes.
- Commit after each task: `feat: task N - <name>`.

---

## 1. Reference analysis (summary)
Source: ahmedsirajeldin2002-coder.github.io/AhmedSiraj

| Element | Reference does | We do |
|---|---|---|
| Order | Hero → Stats → Profile → Projects → Experience → Skills → Education → Training → Contact | Same + **Automation & Tools** section (your edge) |
| Nav | Sticky, logo initials, anchor links, "Hire me" CTA, skip-to-content | Same + active-section highlight + mobile drawer |
| Hero | Status badge ("Open to opportunities · location"), title, name, 1-line value prop, 2 CTAs (Work / CV), icon links, portrait card | Same pattern, own wording |
| Stats | 4 numbers under hero | 4 count-up numbers (real data) |
| Tools strip | Infinite marquee of software names | Same |
| Profile | Numbered section label ("01 Profile"), punchy heading, 2 paragraphs, 4 focus areas, facts grid | Same |
| Projects | Filter chips with counts, image cards, number, sector tag, 3 tags, link to Drive | Same + **country filter** (UAE / KSA / EG) |
| Experience | Vertical timeline, "Current" badge, bullets | Same |
| Skills | 4 lettered categories (A–D) | Same, 4 categories |
| Education / Training | Cards with dates + description | Merged into one section |
| Contact | Big email CTA + copy button, phone, LinkedIn, location, CV | Same + optional Formspree form |
| Theme | Dark navy (#060a14), accent color, rounded cards | Dark + amber/copper accent |

---

## 2. Tech stack
- **Vite + React + TypeScript + Tailwind CSS v4**
- **motion** (Framer Motion): reveal on scroll, stagger
- **react-icons**
- **react-countup** (or custom hook): stats
- Fonts: **Space Grotesk** (headings) + **Inter** (body) via `@fontsource`
- Deploy: **Vercel** (zero config). GitHub Pages alternative: set `base: '/<repo>/'` in `vite.config.ts`.

### Folder structure
```
src/
  data/content.ts        # ALL text, links, projects, stats
  components/
    layout/  Navbar.tsx Footer.tsx Section.tsx
    ui/      Button.tsx Badge.tsx Card.tsx Tag.tsx Marquee.tsx Counter.tsx
    sections/ Hero.tsx Stats.tsx About.tsx Projects.tsx Experience.tsx
              Automation.tsx Skills.tsx Education.tsx Contact.tsx
  hooks/     useActiveSection.ts useReducedMotion.ts
  styles/    index.css (tokens)
public/
  images/ profile.webp  projects/*.webp  og.png
  cv/Ahmed-Elnopy-CV.pdf
```

---

## 3. Design system

### Colors
| Token | Hex | Use |
|---|---|---|
| bg | #070B14 | Page background |
| surface | #0E1524 | Cards |
| surface-2 | #141D30 | Hover / raised |
| border | #1F2A40 | Card borders |
| text | #E8ECF4 | Primary text |
| muted | #8A96AD | Secondary text |
| accent | #F5A524 | Amber, CTAs, highlights |
| accent-2 | #FFC861 | Hover / gradients |
| accent-soft | rgba(245,165,36,0.12) | Badge & tag backgrounds |
| success | #34D399 | "Open to work" dot |

Glass: `bg-surface/70 backdrop-blur-md border border-border` (navbar + hero card only).

### Typography
- H1: Space Grotesk 600, `clamp(2.5rem, 6vw, 4.5rem)`, tight tracking
- H2: Space Grotesk 600, `clamp(1.75rem, 3.5vw, 2.75rem)`
- Section label: Inter 500, 0.75rem, uppercase, tracking-widest, accent ("01 — Profile")
- Body: Inter 400, 1rem / 1.7

### Spacing & shape
- Section padding: `py-24 md:py-32`; container `max-w-6xl px-4 md:px-6`
- Radius: sm 8px · md 12px · lg 16px (cards) · full (chips, buttons)
- Card hover: `-translate-y-1` + accent border glow, 200ms

### Core components
Button (primary / ghost) · Badge · Tag · Card · SectionHeader · Marquee · Counter · FilterChips · TimelineItem

---

## 4. Content (extracted from CV)
Put into `content.ts`. Items marked TODO need your input.

**Identity**
- Name: Ahmed Gamal Elnopy
- Title: Electrical Engineer · MEP & BIM
- Badge: Open to opportunities · Abu Dhabi, UAE
- Value prop (draft): "I turn electrical designs into coordinated, buildable BIM models and shop drawings — across the UAE, Saudi Arabia and Egypt."
- Email: TODO · LinkedIn URL: TODO · Phones: +971 50 180 0351 / +20 109 490 5285

**Stats** (verify)
- 6+ years experience
- 3 countries (UAE · KSA · Egypt)
- 6 companies
- TODO: projects delivered (e.g. 10+)

**Tools marquee**
Revit · AutoCAD · Navisworks · ETAP · DIALux evo · Dynamo · C# / Revit API · BIM 360 · ACC · ISO 19650

**About — focus areas**
- Power & LV/MV: load schedules, SLDs, BOQs
- Light current: fire alarm, data, CCTV, sound
- Technical office: shop drawings, details, material submittals
- BIM & automation: Revit, Navisworks coordination, Dynamo, C# add-ins

**Facts grid:** Based in Abu Dhabi · Current: MTEC (since Jul 2025) · BSc Electrical Eng., South Valley Univ. · Arabic (native), English

**Experience (timeline)**
1. MTEC — BIM Electrical Technical Office Engineer — Abu Dhabi — Jul 2025–Present (Current)
2. C&P — BIM Electrical Technical Office Engineer — Cairo — May–Jul 2025
3. EGEC — BIM Electrical Design Engineer — Cairo — Jul 2024–May 2025
4. Albawani — BIM Electrical Technical Office Engineer — Riyadh — May 2023–Jul 2024
5. Solid Construction — BIM Electrical Technical Office Engineer — Cairo — Dec 2021–May 2023
6. Power Tech Co. for Earthing — Electrical Technical Office Engineer — Cairo — Dec 2020–Dec 2021
(Bullets: copy from CV, max 3 per role, start with a verb.)

**Projects** (filters: sector + country)
| # | Project | Company | Country | Sector | Tags |
|---|---|---|---|---|---|
| 1 | TODO: current MTEC project | MTEC | UAE | TODO | Shop Drawings · Lighting · Containment |
| 2 | RCU AlUla Schools | EGEC | KSA | Education | Full Design · Revit · BIM |
| 3 | Modon Projects | EGEC | KSA | Industrial | Power · Lighting · LV |
| 4 | Madina Entertainment Complex | Albawani | KSA | Entertainment | BIM Model · Construction Dwgs |
| 5 | King Salman Park | Albawani | KSA | Entertainment | Coordination · Landscape |
| 6 | IL-Bosco, New Capital | Solid | EG | Residential | Shop Drawings |
| 7 | Odyssia City, Mostakbal City | Solid | EG | Residential | Shop Drawings |
| 8 | District 5 – Marakez | Solid | EG | Mixed-use | Layout Optimization · RFIs |
Images: placeholders now (`/images/projects/placeholder.webp`). Avoid confidential shop drawings; use public renders or cleaned model views.

**Automation & Tools** (new section)
- Dynamo scripts for bulk Revit tasks — TODO: 1–2 real examples
- C# Revit API add-ins — TODO: examples
- Optional: GIFs/screenshots later

**Skills (4 categories)**
- A. BIM & Software: Revit, Navisworks, AutoCAD, BIM 360 / ACC
- B. Electrical Design: Load schedules, SLD, LV/MV distribution, ETAP, DIALux evo, Earthing & lightning protection
- C. Light Current: Fire alarm, Data networks, CCTV, Sound systems
- D. Technical Office: Shop drawings, Submittals, BOQ & QTO, RFIs, Consultant coordination

**Education & Certifications**
- BSc Electrical Engineering — South Valley University — 2015–2020 — Grad project: Power Distribution & Light Current (Excellent)
- MEP BIM Diploma — Kaitech Scholarship — 2021 (Revit MEP, clash detection, ISO 19650, Dynamo, 4D–7D)
- Mastering Revit API — Elzohry Academy — 2023 (C#, Revit API, automation)
- Power System Distribution — JELECOM — 2020
- PLC & Automation — ATS — 2020

**Hide:** overall grade "Good", English level.

---

## 5. Tasks (one session each)

**Task 1: Setup**
Vite React-TS, Tailwind v4, fonts, design tokens in `index.css`, base layout, `Section` + `SectionHeader`, empty `content.ts` with types. Dark bg renders.

**Task 2: Content file**
Fill `content.ts` from Section 4. Typed (`Project`, `Job`, `Stat`, `SkillGroup`, `Cert`). TODOs kept.

**Task 3: Navbar + Hero**
Sticky glass navbar, active link, mobile drawer, Hire-me CTA, skip link. Hero: badge with pulse dot, title, name, value prop, CTAs (View work / Download CV), icon links, portrait card (placeholder).

**Task 4: Stats + Tools marquee**
Count-up on view (once). Pure-CSS infinite marquee, pauses on hover, static row if reduced motion.

**Task 5: About**
Section label, heading, 2 paragraphs, 4 focus cards with icons, facts grid.

**Task 6: Projects**
Two filter rows (sector with counts, country). "Showing N projects". Animated layout on filter change. Card: image (lazy, aspect 16/10), number, sector tag, title, 1-line description, 3 tags, optional link.

**Task 7: Experience**
Vertical timeline, accent line, dot per role, Current badge, company + location + dates, bullets. Staggered reveal.

**Task 8: Automation + Skills**
Automation: 2–3 cards (problem → tool → time saved). Skills: 4 lettered category cards.

**Task 9: Education & Certifications + Contact + Footer**
Degree card + cert cards. Contact: large email with copy-to-clipboard + toast, phone (both), LinkedIn, location, CV download. Footer: name, tagline, back-to-top.

**Task 10: Polish**
Scroll reveals, hover states, focus rings, reduced motion, test 375/768/1280, fix overflow. Lighthouse ≥ 90 on all four categories.

**Task 11: SEO + Deploy**
Title, meta description, OG/Twitter tags, `og.png` (1200×630), favicon, `robots.txt`, `sitemap.xml`, JSON-LD `Person`. Images → WebP with width/height. Deploy to Vercel. Custom domain optional.

---

## 6. Before Task 2 — I need from you
1. Email + LinkedIn URL
2. Current MTEC project name + sector
3. Real project count
4. 1–2 Dynamo / C# tool examples (what problem it solved)
5. Later: profile photo, project images, CV PDF

## 7. Start right now
1. Install Node 20+ and Git; create GitHub repo `portfolio`.
2. Put this file in the repo root as `PLAN.md`.
3. Open Claude Code in the repo, model Sonnet 5.5.
4. Send: "Read PLAN.md. Do Task 1 only."
5. Fill the Section 6 list while Task 1 runs.

---

## 8. Status (updated 2026-10-13)
- [x] Task 1 Setup · [x] Task 2 Content · [x] Task 3 Navbar + Hero · [x] Task 4 Stats + Marquee
- [x] Task 5 About · [x] Task 6 Projects · [x] Task 7 Experience · [x] Task 8 Automation + Skills
- [x] Task 9 Education + Contact + Footer · [x] Task 10 Polish
- [x] Task 11 SEO (meta, OG/Twitter, og.png, favicon, robots.txt, sitemap.xml, JSON-LD)
- [x] Task 11 Deploy: GitHub Pages via Actions (`.github/workflows/deploy.yml`), live at https://lnopy96.github.io/ahmed-elnopy/ — every push to `main` redeploys. Vercel remains an optional alternative (README). Custom domain optional.

Lighthouse (local production build): mobile 93 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100
(performance / accessibility / best practices / SEO).

Still optional: images for Jacob & Co., RCU Schools, MODON, AlUla, King Salman Park, Odyssia
(cards show a blueprint placeholder until added); Formspree contact form.
