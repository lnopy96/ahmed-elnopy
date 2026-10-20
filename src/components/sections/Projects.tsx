import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi'
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <Cover project={project} />
        <span className="absolute top-3 left-3 rounded-full bg-bg/80 px-2.5 py-0.5 font-heading text-xs text-accent backdrop-blur">
          {pad(project.id)}
        </span>
        {project.current && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-bg/80 px-2.5 py-0.5 text-xs font-medium text-accent backdrop-blur">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-success motion-safe:animate-pulse" />
            {ui.currentProject}
          </span>
        )}
        {project.imageCredit && (
          <span className="absolute right-3 bottom-2 text-[10px] text-text/70 drop-shadow">
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

export function Projects() {
  const [sector, setSector] = useState(ALL)
  const [country, setCountry] = useState(ALL)

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
        <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </Section>
  )
}
