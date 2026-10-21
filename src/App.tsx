import { useMemo } from 'react'
import { Contacto } from './components/Contacto'
import { Educacion } from './components/Educacion'
import { Experiencia } from './components/Experiencia'
import { Footer } from './components/Footer'
import { Habilidades } from './components/Habilidades'
import { Hero } from './components/Hero'
import { Logros } from './components/Logros'
import { Navbar } from './components/Navbar'
import { Proyectos } from './components/Proyectos'
import { SobreMi } from './components/SobreMi'
import { usePortfolioData } from './hooks/usePortfolioData'
import { useActiveSection } from './hooks/useActiveSection'
import { education, favoriteTechnologies, profile } from './data/portfolio'

function App() {
  const sectionIds = useMemo(
    () => ['inicio', 'sobre-mi', 'habilidades', 'proyectos', 'experiencia', 'logros', 'educacion', 'contacto'],
    [],
  )
  const activeSection = useActiveSection(sectionIds)
  const portfolioData = usePortfolioData()
  const dynamicData = portfolioData.data

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Navbar activeSection={activeSection} />
      <main id="contenido">
        <Hero profile={profile} />
        <SobreMi profile={profile} />
        <Habilidades
          skills={dynamicData?.skills ?? []}
          favoriteTechnologies={favoriteTechnologies}
          status={portfolioData.status}
          error={portfolioData.error}
          onRetry={portfolioData.retry}
        />
        <Proyectos
          projects={dynamicData?.projects ?? []}
          status={portfolioData.status}
          error={portfolioData.error}
          onRetry={portfolioData.retry}
        />
        <Experiencia
          experiences={dynamicData?.experiences ?? []}
          status={portfolioData.status}
          error={portfolioData.error}
          onRetry={portfolioData.retry}
        />
        <Logros
          achievements={dynamicData?.achievements ?? []}
          status={portfolioData.status}
          error={portfolioData.error}
          onRetry={portfolioData.retry}
        />
        <Educacion education={education} />
        <Contacto profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  )
}

export default App
