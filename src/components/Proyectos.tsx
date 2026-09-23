import type { Project } from '../types/portfolio'
import { EmptyState } from './EmptyState'
import { ProyectoCard } from './ProyectoCard'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'

interface ProyectosProps {
  projects: Project[]
}

export function Proyectos({ projects }: ProyectosProps) {
  return (
    <section id="proyectos" className="section-pad section-muted" aria-labelledby="projects-title">
      <div className="container">
        <SectionReveal>
          <SectionHeading
            eyebrow="03 / Proyectos"
            title="El trabajo habla cuando tiene contexto."
            description="Cada proyecto tendrá una historia breve, sus tecnologías y únicamente los enlaces que existan."
            id="projects-title"
          />
        </SectionReveal>

        {projects.length ? (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <SectionReveal key={project.title}>
                <ProyectoCard project={project} index={index} />
              </SectionReveal>
            ))}
          </div>
        ) : (
          <SectionReveal>
            <EmptyState
              title="Proyectos por incorporar"
              description="Agregaremos entre tres y seis proyectos reales con sus capturas, tecnologías, estados y enlaces disponibles."
            />
          </SectionReveal>
        )}
      </div>
    </section>
  )
}
