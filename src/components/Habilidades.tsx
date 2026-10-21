import type { Skill } from '../types/portfolio'
import type { RemoteStatus } from '../hooks/usePortfolioData'
import { RemoteState } from './RemoteState'
import { SectionHeading } from './SectionHeading'
import { SectionReveal } from './SectionReveal'
import { SkillCategoryCard } from './SkillCategoryCard'

interface HabilidadesProps {
  skills: Skill[]
  status: RemoteStatus
  error: string | null
  onRetry: () => void
}

const preferredCategoryOrder = ['Frontend', 'Backend', 'Bases de datos', 'Herramientas', 'Otros']

function groupSkillsByCategory(skills: Skill[]) {
  const groups = new Map<string, Skill[]>()

  for (const skill of skills) {
    const category = skill.category.trim() || 'Sin categoría'
    const group = groups.get(category) ?? []
    group.push(skill)
    groups.set(category, group)
  }

  // Las categorías conocidas mantienen su orden y las nuevas aparecen al final
  // según el orden de la primera habilidad recibida desde Supabase.
  const orderedCategories = [
    ...preferredCategoryOrder.filter((category) => groups.has(category)),
    ...[...groups.keys()].filter((category) => !preferredCategoryOrder.includes(category)),
  ]

  return orderedCategories.map((category) => ({ category, skills: groups.get(category) ?? [] }))
}

export function Habilidades({ skills, status, error, onRetry }: HabilidadesProps) {
  const categories = groupSkillsByCategory(skills)

  return (
    <section id="habilidades" className="section-pad" aria-labelledby="skills-title">
      <div className="container">
        <SectionReveal>
          <SectionHeading
            eyebrow="02 / Habilidades"
            title="Tecnologías y herramientas"
            description="Conocimientos organizados por área, obtenidos directamente desde el portfolio publicado."
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
            {categories.map(({ category, skills: categorySkills }) => (
              <SkillCategoryCard key={category} category={category} skills={categorySkills} />
            ))}
          </div>
        </RemoteState>
      </div>
    </section>
  )
}
