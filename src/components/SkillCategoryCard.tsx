import { useId } from 'react'
import type { Skill } from '../types/portfolio'

interface SkillCategoryCardProps {
  category: string
  skills: Skill[]
}

const skillMarks: Record<string, string> = {
  HTML: '5',
  CSS: '3',
  JavaScript: 'JS',
  TypeScript: 'TS',
  React: '⚛',
  Bootstrap: 'B',
  'Node.js': 'N',
  Express: 'Ex',
  PHP: 'PHP',
  MySQL: 'My',
  SQL: 'DB',
  Git: 'Git',
  GitHub: 'GH',
  Vite: 'V',
  'VS Code': 'VS',
  'Responsive design': '↔',
  'APIs REST': 'API',
  'React Router': 'R↗',
}

function getSkillMark(name: string) {
  return skillMarks[name] ?? name.match(/[\p{L}\p{N}]/u)?.[0]?.toUpperCase() ?? '?'
}

function getSafeIconSource(icon: string | undefined) {
  const value = icon?.trim()

  if (!value) return undefined
  if (value.startsWith('/assets/')) return value

  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : undefined
  } catch {
    return undefined
  }
}

function CategoryMark({ category }: { category: string }) {
  const mark = category === 'Frontend'
    ? '</>'
    : category === 'Backend'
      ? '⌘'
      : category === 'Bases de datos'
        ? '◉'
        : category === 'Herramientas'
          ? '⚙'
          : '✦'

  return <span className="skill-category-mark" aria-hidden="true">{mark}</span>
}

export function SkillCategoryCard({ category, skills }: SkillCategoryCardProps) {
  const headingId = useId()

  return (
    <article className="skill-category-card" aria-labelledby={headingId}>
      <header className="skill-category-header">
        <CategoryMark category={category} />
        <h3 id={headingId}>{category}</h3>
      </header>

      <ul className="skill-list">
        {skills.map((skill) => {
          const iconSource = getSafeIconSource(skill.icon)

          return (
            <li className="skill-item" key={`${skill.category}-${skill.name}`}>
              <span className="skill-mark" aria-hidden="true">
                {getSkillMark(skill.name)}
                {iconSource && (
                  <img
                    src={iconSource}
                    alt=""
                    loading="lazy"
                    onError={(event) => { event.currentTarget.hidden = true }}
                  />
                )}
              </span>
              <span className="skill-name">{skill.name}</span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
