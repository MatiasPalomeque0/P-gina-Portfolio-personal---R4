import type { Project } from '../types/portfolio'
import { ProyectoCard } from './ProyectoCard'
import { RemoteState } from './RemoteState'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'
import type { RemoteStatus } from '../hooks/usePortfolioData'

interface ProyectosProps {
  projects: Project[]
  status: RemoteStatus
  error: string | null
  onRetry: () => void
}

export function Proyectos({ projects, status, error, onRetry }: ProyectosProps) {
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

        <RemoteState
          status={status}
          error={error}
          hasData={projects.length > 0}
          emptyTitle="No hay proyectos publicados"
          emptyDescription="No hay proyectos visibles en Supabase en este momento."
          onRetry={onRetry}
        >
          <div className="projects-grid">
            {projects.map((project, index) => (
              <SectionReveal key={project.title}>
                <ProyectoCard project={project} index={index} />
              </SectionReveal>
            ))}
          </div>
        </RemoteState>
      </div>
    </section>
  )
}
