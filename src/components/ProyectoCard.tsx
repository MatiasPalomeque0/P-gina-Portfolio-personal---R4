import type { Project } from '../types/portfolio'

interface ProyectoCardProps {
  project: Project
  index: number
}

export function ProyectoCard({ project, index }: ProyectoCardProps) {
  return (
    <article className="project-card">
      <div className="project-card-topline">
        <span className="project-number">0{index + 1}</span>
        <span className="status-label">{project.status}</span>
      </div>
      {project.imageUrl ? (
        <img className="project-image" src={project.imageUrl} alt={`Captura de ${project.title}`} loading="lazy" />
      ) : (
        <div className="project-image project-image-placeholder" aria-hidden="true">
          <span>{project.category ?? 'Proyecto'}</span>
        </div>
      )}
      <div className="project-content">
        {project.category && <p className="card-kicker">{project.category}</p>}
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-list" aria-label="Tecnologías utilizadas">
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="project-links">
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Demo ↗</a>}
        </div>
      </div>
    </article>
  )
}
