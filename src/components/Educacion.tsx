import type { Education as EducationData } from '../types/portfolio'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'

interface EducacionProps {
  education: EducationData
}

export function Educacion({ education }: EducacionProps) {
  return (
    <section id="educacion" className="section-pad" aria-labelledby="education-title">
      <div className="container">
        <SectionReveal>
          <SectionHeading
            eyebrow="06 / Educación"
            title="Una base técnica para seguir construyendo."
            description="Formación que combina fundamentos informáticos con práctica mediante trabajos y proyectos."
            id="education-title"
          />
        </SectionReveal>

        <SectionReveal className="education-card">
          <div>
            <p className="card-kicker">{education.focus}</p>
            <h3>{education.title}</h3>
            <p>{education.institution}</p>
          </div>
          <div>
            <p className="education-label">Áreas relevantes</p>
            <div className="tag-list">
              {education.subjects.map((subject) => <span key={subject}>{subject}</span>)}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
