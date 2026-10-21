import type { Experience as ExperienceItem } from '../types/portfolio'
import type { RemoteStatus } from '../hooks/usePortfolioData'
import { RemoteState } from './RemoteState'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'

interface ExperienciaProps {
  experiences: ExperienceItem[]
  status: RemoteStatus
  error: string | null
  onRetry: () => void
}

export function Experiencia({ experiences, status, error, onRetry }: ExperienciaProps) {
  return (
    <section id="experiencia" className="section-pad section-muted" aria-labelledby="experience-title">
      <div className="container">
        <SectionReveal>
          <SectionHeading
            eyebrow="04 / Experiencia"
            id="experience-title"
          />
        </SectionReveal>

        <RemoteState
          status={status}
          error={error}
          hasData={experiences.length > 0}
          emptyTitle="No hay experiencias publicadas"
          emptyDescription="No hay experiencias visibles en Supabase en este momento."
          onRetry={onRetry}
        >
          <div className="timeline">
            {experiences.map((experience) => (
              <article className="timeline-item" key={`${experience.period}-${experience.title}`}>
                <p className="timeline-period">{experience.period}</p>
                <div>
                  <h3>{experience.title}</h3>
                  {experience.organization && <p className="timeline-organization">{experience.organization}</p>}
                  {experience.description && <p>{experience.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </RemoteState>
      </div>
    </section>
  )
}
