import type { Achievement, Education, Experience, Profile, Project, Skill } from '../types/portfolio'

export const profile: Profile = {
  name: 'Matías Palomeque',
  role: 'Estudiante de informática y desarrollador web',
  summary:
    'Construyo aplicaciones web mientras sigo fortaleciendo mis conocimientos de frontend, backend y bases de datos.',
  about: [
    'Soy estudiante de una escuela técnica con orientación informática y me interesa transformar problemas concretos en aplicaciones claras y funcionales.',
    'Trabajo con React, TypeScript, Node.js y MySQL, y quiero seguir creciendo en el desarrollo full-stack y el trabajo colaborativo.',
  ],
  location: 'Mar del Plata',
  institution: 'EEST N°5',
  avatarUrl: '/assets/perfil-matias.png',
  email: 'matiaspalomeque2008@gmail.com',
  githubUrl: 'https://github.com/MatiasPalomeque0',
}

export const skills: Skill[] = [
  { name: 'HTML', category: 'Frontend' },
  { name: 'CSS', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'PHP', category: 'Backend' },
  { name: 'MySQL', category: 'Bases de datos' },
  { name: 'SQL', category: 'Bases de datos' },
  { name: 'Git', category: 'Herramientas' },
  { name: 'GitHub', category: 'Herramientas' },
  { name: 'Vite', category: 'Herramientas' },
  { name: 'VS Code', category: 'Herramientas' },
  { name: 'Responsive design', category: 'Otros' },
  { name: 'APIs REST', category: 'Otros' },
  { name: 'React Router', category: 'Otros' },
]

export const favoriteTechnologies = ['React', 'TypeScript', 'Node.js', 'MySQL']

export const experiences: Experience[] = [
  {
    period: 'R1',
    title: 'React + Vite',
    organization: 'Trabajo práctico de frontend',
    description:
      'Aplicación educativa para practicar componentes, props, estado, listas, formularios, navegación y estilos responsive.',
  },
  {
    period: 'R2',
    title: 'Manejo de Rutas',
    organization: 'Lista de tareas con React Router',
    description:
      'Aplicación de tareas con TypeScript, rutas reales, formulario de creación, detalle y descarga de datos en JSON.',
  },
  {
    period: 'R3',
    title: 'Sistema de Usuarios',
    organization: 'Proyecto full-stack',
    description:
      'Sistema con React, Express, API REST y MySQL, incluyendo autenticación, persistencia, validaciones y protección de sesión.',
  },
]

export const achievements: Achievement[] = [
  {
    title: 'Componentes, props y estado',
    period: 'R1',
    description: 'Construcción de una interfaz React con componentes reutilizables, estado local, formularios y listas.',
  },
  {
    title: 'Navegación SPA con rutas reales',
    period: 'R2',
    description: 'Implementación de React Router para separar listado, detalle y creación de tareas sin perder la navegación de la aplicación.',
  },
  {
    title: 'React + API REST + MySQL',
    period: 'R3',
    description: 'Conexión de un frontend React con un backend Express y persistencia de usuarios en MySQL.',
  },
]

export const education: Education = {
  title: 'Formación técnica',
  institution: 'EEST N°5',
  focus: 'Orientación Informática',
  subjects: ['Programación', 'Bases de Datos', 'Redes', 'Sistemas Operativos', 'Hardware'],
}

export const projects: Project[] = [
  {
    title: 'R1 — React + Vite',
    description: 'Aplicación educativa con ejercicios de componentes, props, estado, tareas, formularios, temas y navegación por anclas.',
    technologies: ['React', 'Vite', 'JavaScript', 'JSX', 'CSS'],
    status: 'Terminado',
    category: 'Frontend',
  },
  {
    title: 'R2 — Manejo de Rutas',
    description: 'Lista de tareas con rutas para listado, detalle y creación, además de validación y descarga de datos.',
    technologies: ['React', 'TypeScript', 'Vite', 'React Router', 'Bootstrap'],
    status: 'Terminado',
    category: 'Navegación SPA',
  },
  {
    title: 'R3 — Sistema de Usuarios',
    description: 'Sistema full-stack con registro, login, panel protegido, API REST, sesiones seguras y persistencia en MySQL.',
    technologies: ['React', 'TypeScript', 'Express', 'API REST', 'MySQL'],
    status: 'Terminado',
    category: 'Full Stack',
  },
]
