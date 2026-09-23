import type { Profile } from '../types/portfolio'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'

interface SobreMiProps {
  profile: Profile
}

export function SobreMi({ profile }: SobreMiProps) {
  return (
    <section id="sobre-mi" className="section-pad section-muted" aria-labelledby="about-title">
      <div className="container">
        <SectionReveal>
          <SectionHeading
            eyebrow="01 / Sobre mí"
            id="about-title"
          />
        </SectionReveal>

        <div className="about-grid">
          <SectionReveal className="about-statement">
            <p className="large-copy">
              {profile.about[0]}
            </p>
            <p>{profile.about[1]}</p>
          </SectionReveal>

          <SectionReveal className="about-facts">
            <div className="fact-row">
              <span>Enfoque</span>
              <strong>Desarrollo web</strong>
            </div>
            <div className="fact-row">
              <span>Formación</span>
              <strong>{profile.institution}</strong>
            </div>
            <div className="fact-row">
              <span>Ubicación</span>
              <strong>{profile.location}</strong>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
