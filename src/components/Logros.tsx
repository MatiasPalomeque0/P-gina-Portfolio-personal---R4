import type { Achievement } from '../types/portfolio'
import type { RemoteStatus } from '../hooks/usePortfolioData'
import { RemoteState } from './RemoteState'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'

interface LogrosProps {
  achievements: Achievement[]
  status: RemoteStatus
  error: string | null
  onRetry: () => void
}

export function Logros({ achievements, status, error, onRetry }: LogrosProps) {
  return (
    <section id="logros" className="section-pad" aria-labelledby="achievements-title">
      <div className="container">
        <SectionReveal>
          <SectionHeading
            eyebrow="05 / Logros"
            id="achievements-title"
          />
        </SectionReveal>

        <RemoteState
          status={status}
          error={error}
          hasData={achievements.length > 0}
          emptyTitle="No hay logros publicados"
          emptyDescription="No hay logros visibles en Supabase en este momento."
          onRetry={onRetry}
        >
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <article className="achievement-card" key={achievement.title}>
                <span className="achievement-index" aria-hidden="true">✦</span>
                <div>
                  {achievement.period && <p className="card-kicker">{achievement.period}</p>}
                  <h3>{achievement.title}</h3>
                  {achievement.description && <p>{achievement.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </RemoteState>
      </div>
    </section>
  )
}
