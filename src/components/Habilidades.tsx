import type { Skill } from '../types/portfolio'
import { EmptyState } from './EmptyState'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'

interface HabilidadesProps {
  skills: Skill[]
  favoriteTechnologies: string[]
}

export function Habilidades({ skills, favoriteTechnologies }: HabilidadesProps) {
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

        {skills.length ? (
          <div className="skills-grid">
            {skills.map((skill) => (
              <article className="skill-card" key={`${skill.category}-${skill.name}`}>
                <p>{skill.category}</p>
                <h3>{skill.name}</h3>
                {skill.description && <span>{skill.description}</span>}
              </article>
            ))}
          </div>
        ) : <SectionReveal><EmptyState title="Habilidades por completar" description="Aquí aparecerán las tecnologías y herramientas que realmente dominas o estás aprendiendo." /></SectionReveal>}

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
