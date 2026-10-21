import { supabase } from '../lib/supabase'
import { projects as staticProjects } from '../data/portfolio'
import type { Achievement, Experience, Project, Skill } from '../types/portfolio'
import type { Database } from '../types/database'

type ProjectRow = Database['public']['Tables']['proyectos']['Row']
type TechnologyRow = Database['public']['Tables']['tecnologias']['Row']

type ProjectTechnologyRow = {
  id_tecnologia: number
  tecnologias: TechnologyRow | TechnologyRow[] | null
}

type ProjectWithTechnologiesRow = ProjectRow & {
  proyecto_tecnologia: ProjectTechnologyRow[] | null
}

const staticProjectCategories = new Map(staticProjects.map((project) => [project.title, project.category]))

export interface PortfolioData {
  projects: Project[]
  skills: Skill[]
  experiences: Experience[]
  achievements: Achievement[]
}

function throwQueryError(resource: string, message: string): never {
  throw new Error(`No se pudieron cargar ${resource} desde Supabase: ${message}`)
}

function mapProjectStatus(status: ProjectRow['estado']): Project['status'] {
  switch (status) {
    case 'finalizado':
      return 'Terminado'
    case 'en_desarrollo':
      return 'En desarrollo'
    case 'planificado':
      return 'Planificado'
    case 'mantenimiento':
      return 'Mantenimiento'
  }
}

function getTechnology(relationship: ProjectTechnologyRow) {
  if (Array.isArray(relationship.tecnologias)) {
    return relationship.tecnologias[0] ?? null
  }

  return relationship.tecnologias
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('proyectos')
    .select(`
      id_proyecto,
      codigo,
      titulo,
      descripcion_corta,
      imagen_url,
      repositorio_url,
      demo_url,
      fecha,
      estado,
      destacado,
      orden_visualizacion,
      proyecto_tecnologia (
        id_tecnologia,
        tecnologias (
          id_tecnologia,
          nombre,
          categoria,
          icono
        )
      )
    `)
    .eq('publicado', true)
    .order('orden_visualizacion', { ascending: true })
    .order('id_proyecto', { ascending: true })

  if (error) {
    throwQueryError('los proyectos', error.message)
  }

  const rows = (data ?? []) as unknown as ProjectWithTechnologiesRow[]

  return rows.map((project) => ({
    title: project.titulo,
    description: project.descripcion_corta,
    technologies: (project.proyecto_tecnologia ?? [])
      .map(getTechnology)
      .filter((technology): technology is TechnologyRow => technology !== null)
      .map((technology) => technology.nombre),
    status: mapProjectStatus(project.estado),
    category: staticProjectCategories.get(project.titulo),
    githubUrl: project.repositorio_url ?? undefined,
    demoUrl: project.demo_url ?? undefined,
    imageUrl: project.imagen_url ?? undefined,
  }))
}

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('habilidades')
    .select('nombre, categoria, icono, orden_visualizacion')
    .eq('publicado', true)
    .order('orden_visualizacion', { ascending: true })
    .order('id_habilidad', { ascending: true })

  if (error) {
    throwQueryError('las habilidades', error.message)
  }

  return (data ?? []).map((skill) => ({
    name: skill.nombre,
    category: skill.categoria,
    icon: skill.icono ?? undefined,
  }))
}

export async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('experiencias')
    .select('titulo, institucion, descripcion, fecha_inicio, fecha_fin, periodo_academico, orden_visualizacion')
    .eq('publicado', true)
    .order('orden_visualizacion', { ascending: true })
    .order('id_experiencia', { ascending: true })

  if (error) {
    throwQueryError('las experiencias', error.message)
  }

  return (data ?? []).map((experience) => ({
    period: experience.periodo_academico ?? '',
    title: experience.titulo,
    organization: experience.institucion ?? undefined,
    description: experience.descripcion,
  }))
}

export async function getAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabase
    .from('logros')
    .select('titulo, descripcion, periodo_academico, id_logro')
    .eq('publicado', true)
    .order('id_logro', { ascending: true })

  if (error) {
    throwQueryError('los logros', error.message)
  }

  return (data ?? []).map((achievement) => ({
    title: achievement.titulo,
    description: achievement.descripcion ?? undefined,
    period: achievement.periodo_academico ?? undefined,
  }))
}

let cachedPortfolioData: PortfolioData | null = null
let portfolioDataRequest: Promise<PortfolioData> | null = null

export async function fetchPortfolioData(forceRefresh = false): Promise<PortfolioData> {
  if (forceRefresh) {
    cachedPortfolioData = null
  }

  if (cachedPortfolioData) {
    return cachedPortfolioData
  }

  if (!portfolioDataRequest) {
    portfolioDataRequest = Promise.all([getProjects(), getSkills(), getExperiences(), getAchievements()])
      .then(([projects, skills, experiences, achievements]) => {
        const data = { projects, skills, experiences, achievements }
        cachedPortfolioData = data
        return data
      })
      .finally(() => {
        portfolioDataRequest = null
      })
  }

  return portfolioDataRequest
}
