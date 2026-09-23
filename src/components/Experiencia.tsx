import type { Experience as ExperienceItem } from '../types/portfolio'
import { EmptyState } from './EmptyState'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'

interface ExperienciaProps {
  experiences: ExperienceItem[]
}

export function Experiencia({ experiences }: ExperienciaProps) {
  return (
    <section id="experiencia" className="section-pad section-muted" aria-labelledby="experience-title">
      <div className="container">
        <SectionReveal>
          <SectionHeading
            eyebrow="04 / Experiencia"
            id="experience-title"
          />
        </SectionReveal>

        {experiences.length ? (
          <div className="timeline">
            {experiences.map((experience) => (
              <article className="timeline-item" key={`${experience.period}-${experience.title}`}>
                <p className="timeline-period">{experience.period}</p>
                <div>
                  <h3>{experience.title}</h3>
                  <p className="timeline-organization">{experience.organization}</p>
                  <p>{experience.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <SectionReveal>
            <EmptyState
              title="Experiencia por completar"
              description="Podremos sumar trabajos, proyectos de estudio, colaboraciones o experiencias técnicas reales."
            />
          </SectionReveal>
        )}
      </div>
    </section>
  )
}
