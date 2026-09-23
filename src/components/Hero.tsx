import type { Profile } from '../types/portfolio'

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  return (
    <section id="inicio" className="hero section-pad" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio personal · R4</p>
          <h1 id="hero-title">Portfolio personal</h1>
          <p className="hero-role">{profile.name} · {profile.role}</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#proyectos">
              Ver proyectos <span aria-hidden="true">↘</span>
            </a>
            <a className="button button-secondary" href="#sobre-mi">
              Conocer más
            </a>
            <a className="button button-secondary" href="#contacto">
              Contacto
            </a>
          </div>
          <div className="hero-meta" aria-label="Características del proyecto">
            <span><i className="status-dot" aria-hidden="true" /> Una sola página</span>
            <span>React + TypeScript</span>
            <span>Diseño responsive</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Retrato de Matías Palomeque">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          {profile.avatarUrl && <img className="hero-photo" src={profile.avatarUrl} alt={`Retrato de ${profile.name}`} />}
          <div className="hero-photo-shade" aria-hidden="true" />
          <div className="hero-note hero-note-top">01 / presentación</div>
          <div className="hero-note hero-note-bottom">Mar del Plata · Argentina</div>
        </div>
      </div>
    </section>
  )
}
