import type { Profile } from '../types/portfolio'

interface FooterProps {
  profile: Profile
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <a href="#inicio">Volver arriba ↑</a>
        <p className="footer-note">
          Hecho con React · Vite · R4
          {profile.githubUrl && <> · <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a></>}
        </p>
      </div>
    </footer>
  )
}
