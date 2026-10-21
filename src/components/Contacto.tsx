import type { Profile } from '../types/portfolio'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'

interface ContactoProps {
  profile: Profile
}

export function Contacto({ profile }: ContactoProps) {
  const links = [
    profile.email ? { label: 'Email', value: profile.email, href: `mailto:${profile.email}` } : null,
    profile.githubUrl ? { label: 'GitHub', value: 'Ver repositorios', href: profile.githubUrl } : null,
    profile.linkedinUrl ? { label: 'LinkedIn', value: 'Ver perfil', href: profile.linkedinUrl } : null,
  ].filter((link): link is { label: string; value: string; href: string } => link !== null)

  return (
    <section id="contacto" className="section-pad contact-section" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <SectionReveal>
          <SectionHeading
            eyebrow="07 / Contacto"
            title="¿Hablamos de lo que sigue?"
            description="Podés escribirme por email o conocer mis proyectos y repositorios desde GitHub."
            id="contact-title"
          />
        </SectionReveal>

        <SectionReveal className="contact-card">
          {links.length ? (
            <div className="contact-links">
              {links.map((link) => (
                <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
                  <span className="contact-label">{link.label}</span>
                  <strong>{link.value}</strong>
                  <span className="contact-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="contact-empty">
              <span className="contact-symbol" aria-hidden="true">@</span>
              <h3>Canales por completar</h3>
              <p>Se mostrarán aquí el email profesional y los perfiles que autorices.</p>
            </div>
          )}
        </SectionReveal>
      </div>
    </section>
  )
}
