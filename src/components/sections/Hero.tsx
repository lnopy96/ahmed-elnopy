import { FaLinkedinIn } from 'react-icons/fa'
import { FiArrowRight, FiDownload, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { content } from '../../data/content'
import { asset } from '../../lib/asset'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

const { identity, ui } = content

const iconLinks = [
  { href: `mailto:${identity.email}`, label: ui.emailLabel, icon: FiMail },
  { href: identity.linkedin, label: ui.linkedinLabel, icon: FaLinkedinIn, external: true },
  { href: `tel:${identity.phones[0]?.number.replace(/\s/g, '')}`, label: ui.phoneLabel, icon: FiPhone },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(245_165_36/0.14),transparent_55%)]"
      />
      <div className="container-page relative grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Badge pulse>{identity.badge}</Badge>
          <p className="mt-8 section-label">{identity.title}</p>
          <h1 className="mt-3">{identity.name}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{identity.valueProp}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects">
              {ui.viewWork} <FiArrowRight aria-hidden="true" />
            </Button>
            <Button href={asset(identity.cvUrl)} variant="ghost" download>
              <FiDownload aria-hidden="true" /> {ui.downloadCv}
            </Button>
          </div>

          <ul className="mt-8 flex gap-3">
            {iconLinks.map(({ href, label, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-sm rounded-lg border border-border bg-surface/70 p-3 backdrop-blur-md">
          <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-surface-2 to-bg">
            {identity.photo ? (
              <img
                src={asset(identity.photo)}
                srcSet={`${asset(identity.photo.replace('.webp', '-480.webp'))} 480w, ${asset(identity.photo.replace('.webp', '-640.webp'))} 640w, ${asset(identity.photo)} 768w`}
                sizes="(min-width: 768px) 384px, 90vw"
                alt={identity.photoAlt}
                width={768}
                height={1024}
                fetchPriority="high"
                className="size-full object-cover"
              />
            ) : (
              <span aria-hidden="true" className="font-heading text-7xl font-semibold text-accent/80">
                {identity.initials}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 px-2 pt-4 pb-1 text-sm">
            <span className="font-medium">{identity.name}</span>
            <span className="flex items-center gap-1 text-muted">
              <FiMapPin aria-hidden="true" /> {identity.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
