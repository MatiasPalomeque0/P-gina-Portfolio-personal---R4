import type { Skill } from '../types/portfolio'
import type { RemoteStatus } from '../hooks/usePortfolioData'
import { RemoteState } from './RemoteState'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'

interface HabilidadesProps {
  skills: Skill[]
  favoriteTechnologies: string[]
  status: RemoteStatus
  error: string | null
  onRetry: () => void
}

export function Habilidades({ skills, favoriteTechnologies, status, error, onRetry }: HabilidadesProps) {
  return (
    <section id="habilidades" className="section-pad" aria-labelledby="skills-title">
      <div className="container">
        <SectionReveal>
          <SectionHeading
            eyebrow="02 / Habilidades"
            title="Herramientas para convertir ideas en experiencias."
            description="Las habilidades se mostrarán por categorías, sin porcentajes inventados ni niveles difíciles de justificar."
            id="skills-title"
          />
        </SectionReveal>

        <RemoteState
          status={status}
          error={error}
          hasData={skills.length > 0}
          emptyTitle="No hay habilidades publicadas"
          emptyDescription="No hay habilidades visibles en Supabase en este momento."
          onRetry={onRetry}
        >
          <div className="skills-grid">
            {skills.map((skill) => (
              <article className="skill-card" key={`${skill.category}-${skill.name}`}>
                <p>{skill.category}</p>
                <h3>{skill.name}</h3>
                {skill.description && <span>{skill.description}</span>}
              </article>
            ))}
          </div>
        </RemoteState>

        <SectionReveal className="favorite-strip">
          <div>
            <p className="card-kicker">Tecnologías favoritas</p>
            <div className="tag-list">
              {favoriteTechnologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
