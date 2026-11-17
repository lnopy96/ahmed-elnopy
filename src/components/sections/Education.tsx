import { FiAward, FiBookOpen } from 'react-icons/fi'
import { content } from '../../data/content'
import { Section, SectionHeader } from '../layout/Section'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Tag } from '../ui/Tag'

const { education, sections, ui } = content
const meta = sections.education
const degrees = education.filter((e) => e.kind === 'degree')
const certs = education.filter((e) => e.kind === 'certification')

export function Education() {
  return (
    <Section id={meta.id} className="bg-surface/40">
      <SectionHeader number={meta.number} label={meta.label} heading={meta.heading} />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        {degrees.map((d) => (
          <Reveal key={d.title} className="h-full">
            <Card className="relative h-full overflow-hidden border-accent/40 p-6 md:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-accent/10 blur-2xl"
              />
              <span className="flex size-12 items-center justify-center rounded-md bg-accent-soft text-accent">
                <FiBookOpen size={22} aria-hidden="true" />
              </span>
              <p className="mt-6 section-label">{ui.degreeLabel}</p>
              <h3 className="mt-2 text-2xl">{d.title}</h3>
              <p className="mt-1 text-muted">
                {d.issuer} · <span className="tabular-nums">{d.date}</span>
              </p>
              {d.description && <p className="mt-4 text-sm text-muted">{d.description}</p>}
            </Card>
          </Reveal>
        ))}

        <ul className="grid gap-4 sm:grid-cols-2">
          {certs.map((c, i) => (
            <li key={c.title}>
              <Reveal delay={i * 0.06} className="h-full">
                <Card interactive className="h-full p-5">
                  <div className="flex items-start justify-between gap-3">
                    <FiAward size={18} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
                    <span className="flex flex-wrap justify-end gap-1.5">
                      {c.inProgress && <Tag tone="accent">{ui.inProgress}</Tag>}
                      <span className="rounded-full border border-border px-2 py-0.5 text-xs tabular-nums text-muted">
                        {c.date}
                      </span>
                    </span>
                  </div>
                  <h3 className="mt-3 text-base">{c.title}</h3>
                  <p className="text-sm text-accent">{c.issuer}</p>
                  {c.description && <p className="mt-2 text-sm text-muted">{c.description}</p>}
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
