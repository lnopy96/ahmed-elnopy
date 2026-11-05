import { AnimatePresence, m } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FiArrowUpRight, FiMapPin, FiMaximize2, FiX } from 'react-icons/fi'
import { content, type Project } from '../../data/content'
import { asset } from '../../lib/asset'
import { Section, SectionHeader } from '../layout/Section'
import { Card } from '../ui/Card'
import { FilterChips } from '../ui/FilterChips'
import { Tag } from '../ui/Tag'

const { projects, sections, ui } = content
const meta = sections.projects
const ALL = 'all'

const pad = (n: number) => String(n).padStart(2, '0')

function countBy(key: 'sector' | 'country') {
  const counts = new Map<string, number>()
  for (const p of projects) counts.set(p[key], (counts.get(p[key]) ?? 0) + 1)
  return [...counts]
}

const sectorOptions = [
  { value: ALL, label: ui.filterAll, count: projects.length },
  ...countBy('sector')
    .sort((a, b) => b[1] - a[1])
    .map(([value, count]) => ({ value, label: value, count })),
]

const countryOptions = [
  { value: ALL, label: ui.filterAll, count: projects.length },
  ...countBy('country').map(([value, count]) => ({
    value,
    label: ui.countries[value as Project['country']],
    count,
  })),
]

function Cover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={asset(project.image)}
        srcSet={`${asset(project.image.replace('.webp', '-800.webp'))} 800w, ${asset(project.image)} 1600w`}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        alt=""
        loading="lazy"
        decoding="async"
        width={1600}
        height={1000}
        className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
      />
    )
  }
  // Designed placeholder: blueprint grid + project number.
  return (
    <div
      aria-hidden="true"
      className="flex size-full items-center justify-center bg-surface-2 bg-[linear-gradient(rgb(245_165_36/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(245_165_36/0.07)_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      <span className="font-heading text-6xl font-semibold text-accent/30">{pad(project.id)}</span>
    </div>
  )
}

function ProjectCard({ project, onEnlarge }: { project: Project; onEnlarge: (project: Project) => void }) {
  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <Cover project={project} />
        {project.image && (
          <button
            type="button"
            onClick={() => onEnlarge(project)}
            aria-label={`${ui.enlargeImage} ${project.title}`}
            className="absolute inset-0 flex cursor-zoom-in items-center justify-center bg-bg/0 transition-colors duration-200 hover:bg-bg/30 focus-visible:bg-bg/30"
          >
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full bg-bg/80 text-text opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 [button:focus-visible>&]:opacity-100"
            >
              <FiMaximize2 size={16} />
            </span>
          </button>
        )}
        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-bg/80 px-2.5 py-0.5 font-heading text-xs text-accent backdrop-blur">
          {pad(project.id)}
        </span>
        {project.current && (
          <span className="pointer-events-none absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-bg/80 px-2.5 py-0.5 text-xs font-medium text-accent backdrop-blur">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-success motion-safe:animate-pulse" />
            {ui.currentProject}
          </span>
        )}
        {project.imageCredit && (
          <span className="pointer-events-none absolute right-3 bottom-2 text-[10px] text-text/70 drop-shadow">
            {ui.renderCredit} {project.imageCredit}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs text-muted">
          <Tag tone="accent">{project.sector}</Tag>
          <span className="flex items-center gap-1">
            <FiMapPin aria-hidden="true" /> {ui.countries[project.country]} · {project.company}
          </span>
        </div>
        <h3 className="mt-4 text-lg">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-2"
          >
            {ui.viewProject} <FiArrowUpRight aria-hidden="true" />
          </a>
        )}
      </div>
    </Card>
  )
}

/** Full-size image viewer on a native <dialog>: Escape, focus trapping and focus return come from the browser. */
function ImageViewer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  // Natural width/height of the open image, so the frame hugs it instead of letterboxing.
  const [ratio, setRatio] = useState(16 / 10)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
    // Keep the page behind the viewer from scrolling while it is open.
    document.documentElement.style.overflow = project ? 'hidden' : ''
  }, [project])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label={project?.title}
      className="m-auto max-h-[92vh] w-fit max-w-[94vw] overflow-visible bg-transparent p-0 text-text backdrop:bg-bg/85 backdrop:backdrop-blur-sm"
    >
      {project?.image && (
        <figure
          className="relative overflow-hidden rounded-lg border border-border bg-surface"
          style={{ width: `min(94vw, calc(80vh * ${ratio}))` }}
        >
          <img
            src={asset(project.image)}
            alt={project.title}
            onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
            className="block h-auto max-h-[80vh] w-full object-contain"
          />
          <figcaption className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
            <span className="font-medium">{project.title}</span>
            {project.imageCredit && (
              <span className="text-xs text-muted">
                {ui.renderCredit} {project.imageCredit}
              </span>
            )}
          </figcaption>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.closeImage}
            autoFocus
            className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-bg/80 text-text backdrop-blur transition-colors duration-200 hover:text-accent"
          >
            <FiX size={18} aria-hidden="true" />
          </button>
        </figure>
      )}
    </dialog>
  )
}

export function Projects() {
  const [sector, setSector] = useState(ALL)
  const [country, setCountry] = useState(ALL)
  const [enlarged, setEnlarged] = useState<Project | null>(null)

  const visible = useMemo(
    () =>
      projects.filter(
        (p) => (sector === ALL || p.sector === sector) && (country === ALL || p.country === country),
      ),
    [sector, country],
  )

  const reset = () => {
    setSector(ALL)
    setCountry(ALL)
  }

  return (
    <Section id={meta.id}>
      <SectionHeader number={meta.number} label={meta.label} heading={meta.heading} className="mb-10" />

      <div className="space-y-3">
        <FilterChips legend={ui.filterSector} options={sectorOptions} value={sector} onChange={setSector} />
        <FilterChips legend={ui.filterCountry} options={countryOptions} value={country} onChange={setCountry} />
      </div>

      <p aria-live="polite" className="mt-6 mb-8 text-sm text-muted">
        {ui.showing.replace('{n}', String(visible.length)).replace('{total}', String(projects.length))}
      </p>

      {visible.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted">
          <p>{ui.noProjects}</p>
          <button type="button" onClick={reset} className="mt-4 text-sm font-medium text-accent hover:text-accent-2">
            {ui.resetFilters}
          </button>
        </div>
      ) : (
        <m.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <m.li
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} onEnlarge={setEnlarged} />
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      )}
      <ImageViewer project={enlarged} onClose={() => setEnlarged(null)} />
    </Section>
  )
}
