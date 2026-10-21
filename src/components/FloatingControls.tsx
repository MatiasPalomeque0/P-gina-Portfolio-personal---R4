import { useEffect, useRef, useState } from 'react'

type Theme = 'light' | 'dark'

export function FloatingControls() {
  // index.html ya eligió el tema antes del primer render de React.
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  const [showBackToTop, setShowBackToTop] = useState(() => window.scrollY > 400)
  const hasManualTheme = useRef(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: light)')
    try {
      const saved = localStorage.getItem('portfolio-theme')
      hasManualTheme.current = saved === 'light' || saved === 'dark'
    } catch {
      // Sin almacenamiento, los controles siguen funcionando durante la sesión.
    }

    const followSystemTheme = (event: MediaQueryListEvent) => {
      if (!hasManualTheme.current) {
        const nextTheme = event.matches ? 'light' : 'dark'
        document.documentElement.dataset.theme = nextTheme
        setTheme(nextTheme)
      }
    }

    preference.addEventListener('change', followSystemTheme)
    return () => preference.removeEventListener('change', followSystemTheme)
  }, [])

  useEffect(() => {
    // Solo cambia el estado al cruzar el umbral; el listener no bloquea el scroll.
    const updateScrollState = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    hasManualTheme.current = true
    document.documentElement.dataset.theme = nextTheme
    setTheme(nextTheme)
    try {
      localStorage.setItem('portfolio-theme', nextTheme)
    } catch {
      // La falta de persistencia no impide cambiar el tema actual.
    }
  }

  const backToTop = () => {
    // La preferencia de movimiento se consulta al pulsar, también si cambió.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })
    // Actualizar el ancla sin iniciar un segundo desplazamiento del navegador.
    window.history.replaceState(null, '', '#inicio')
  }

  return (
    <div className="floating-controls" role="group" aria-label="Controles de apariencia y navegación">
      <button className="floating-button" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {theme === 'dark' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />}
        </svg>
      </button>
      {showBackToTop && (
        <button className="floating-button" type="button" onClick={backToTop} aria-label="Volver al inicio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 11 6-6 6 6M12 5v14" />
          </svg>
        </button>
      )}
    </div>
  )
}
