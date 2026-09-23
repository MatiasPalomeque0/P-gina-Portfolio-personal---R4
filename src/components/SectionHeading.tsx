interface SectionHeadingProps {
  eyebrow: string
  title?: string
  description?: string
  id?: string
}

export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <header className={`section-heading ${title ? '' : 'is-compact'}`.trim()}>
      <p className="eyebrow" id={!title ? id : undefined}>{eyebrow}</p>
      {title && <h2 id={id}>{title}</h2>}
      {description && <p className="section-description">{description}</p>}
    </header>
  )
}
