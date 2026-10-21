import { useRef, useState } from 'react'

interface NavbarProps {
  activeSection: string
}

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'logros', label: 'Logros' },
  { id: 'educacion', label: 'Educación' },
  { id: 'contacto', label: 'Contacto' },
]

export function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const handleNavigate = () => setIsOpen(false)

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a className="brand" href="#inicio" onClick={handleNavigate} aria-label="Ir al inicio">
          <span className="brand-mark" aria-hidden="true">
            P
          </span>
          <span>portfolio<span className="brand-dot">.</span></span>
        </a>

        <button
          className="menu-toggle"
          ref={toggleRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
          <span aria-hidden="true">{isOpen ? '×' : '☰'}</span>
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav ${isOpen ? 'is-open' : ''}`}
          aria-label="Navegación principal"
          onKeyDown={(event) => {
            // Escape cierra el menú y devuelve el foco al control que lo abrió.
            if (event.key === 'Escape') {
              setIsOpen(false)
              toggleRef.current?.focus()
            }
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              className={activeSection === item.id ? 'is-active' : ''}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={handleNavigate}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
