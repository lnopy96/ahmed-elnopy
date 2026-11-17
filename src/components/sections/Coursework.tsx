import { FiArrowUpRight, FiPlayCircle } from 'react-icons/fi'
import { content, type CourseworkStudy } from '../../data/content'
import { asset } from '../../lib/asset'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Tag } from '../ui/Tag'

const { coursework, ui } = content

function StudyCover({ study }: { study: CourseworkStudy }) {
  if (study.image) {
    return (
      <img
        src={asset(study.image)}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
      />
    )
  }
  // Placeholder until the deck images are uploaded.
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 bg-surface-2 bg-[linear-gradient(rgb(245_165_36/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(245_165_36/0.07)_1px,transparent_1px)] bg-[size:24px_24px] text-muted">
      <FiPlayCircle size={28} aria-hidden="true" className="text-accent/60" />
      <span className="text-xs">{ui.mediaComingSoon}</span>
    </div>
  )
}

/** Coordination studies from the KAITECH Technical Coordination Diploma, shown under the project grid. */
export function Coursework() {
  return (
    <div className="mt-20">
      <Reveal>
        <p className="section-label">{coursework.label}</p>
        <h3 className="mt-3 text-2xl md:text-3xl">{coursework.heading}</h3>
        <p className="mt-3 max-w-2xl text-muted">{coursework.intro}</p>
      </Reveal>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coursework.studies.map((study, i) => (
          <li key={study.title}>
            <Reveal delay={i * 0.06} className="h-full">
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden border-b border-border">
                  <StudyCover study={study} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div>
                    <Tag tone="accent">{coursework.tag}</Tag>
                  </div>
                  <h4 className="mt-4 text-lg">{study.title}</h4>
                  <p className="mt-2 flex-1 text-sm text-muted">{study.description}</p>
                  {study.video && (
                    <a
                      href={study.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-2"
                    >
                      {ui.watchVideo} <FiArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
