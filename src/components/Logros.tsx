import type { Achievement } from '../types/portfolio'
import { EmptyState } from './EmptyState'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'

interface LogrosProps {
  achievements: Achievement[]
}

export function Logros({ achievements }: LogrosProps) {
  return (
    <section id="logros" className="section-pad" aria-labelledby="achievements-title">
      <div className="container">
        <SectionReveal>
          <SectionHeading
            eyebrow="05 / Logros"
            id="achievements-title"
          />
        </SectionReveal>

        {achievements.length ? (
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <article className="achievement-card" key={achievement.title}>
                <span className="achievement-index" aria-hidden="true">✦</span>
                <div>
                  {achievement.period && <p className="card-kicker">{achievement.period}</p>}
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <SectionReveal>
            <EmptyState
              title="Logros por completar"
              description="Reconocimientos, certificaciones, objetivos alcanzados o participaciones relevantes tendrán su espacio aquí."
            />
          </SectionReveal>
        )}
      </div>
    </section>
  )
}
