import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface SectionRevealProps {
  children: ReactNode
  className?: string
}

export function SectionReveal({ children, className = '' }: SectionRevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
