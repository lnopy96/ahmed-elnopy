import { FiMapPin } from 'react-icons/fi'
import { content } from '../../data/content'
import { duration } from '../../lib/duration'
import { Section, SectionHeader } from '../layout/Section'
import { Reveal } from '../ui/Reveal'

const { experience, sections, ui } = content
const meta = sections.experience

export function Experience() {
  return (
    <Section id={meta.id}>
      <SectionHeader number={meta.number} label={meta.label} heading={meta.heading} />
      <ol className="relative ml-2 border-l border-accent/30 md:ml-0 md:border-l-0">
        {/* Desktop centre-left rail */}
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-[13.25rem] hidden w-px bg-accent/30 md:block" />
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.start}`} className="relative pb-12 pl-8 last:pb-0 md:grid md:grid-cols-[12rem_1fr] md:gap-10 md:pl-0">
            <span
              aria-hidden="true"
              className={`absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 md:left-[calc(13.25rem-7px)] ${
                job.current ? 'border-accent bg-accent shadow-[0_0_0_4px_rgb(245_165_36/0.2)]' : 'border-accent/60 bg-bg'
              }`}
            />
            <Reveal delay={i * 0.05} className="md:pt-0.5 md:text-right">
              <p className="text-sm font-medium tabular-nums text-text">
                {job.start} – {job.end}
              </p>
              {/* "Present" is measured from today, which can differ from the prerender date. */}
              <p className="mt-1 text-xs text-muted tabular-nums" suppressHydrationWarning>
                {duration(job.start, job.end)}
              </p>
              {job.current && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
                  {ui.current}
                </span>
              )}
            </Reveal>
            <Reveal delay={i * 0.05 + 0.05} className="mt-2 md:mt-0">
              <h3 className="text-xl">{job.role}</h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                <span className="font-medium text-accent">{job.company}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <FiMapPin aria-hidden="true" /> {job.location}
                </span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent/60" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
