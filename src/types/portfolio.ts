export type ProjectStatus = 'Terminado' | 'En desarrollo' | 'Prototipo'

export interface Skill {
  name: string
  category: string
  description?: string
}

export interface Experience {
  period: string
  title: string
  organization: string
  description: string
}

export interface Achievement {
  title: string
  description: string
  period?: string
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  status: ProjectStatus
  category: string
  githubUrl?: string
  demoUrl?: string
  imageUrl?: string
}

export interface Profile {
  name: string
  role: string
  summary: string
  about: string[]
  location?: string
  institution?: string
  avatarUrl?: string
  email?: string
  githubUrl?: string
  linkedinUrl?: string
}

export interface Education {
  title: string
  institution: string
  focus: string
  subjects: string[]
}
