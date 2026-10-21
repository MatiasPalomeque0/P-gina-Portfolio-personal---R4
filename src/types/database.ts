export type Database = {
  public: {
    Tables: {
      proyectos: {
        Row: {
          id_proyecto: number
          codigo: string | null
          titulo: string
          descripcion_corta: string
          descripcion_completa: string | null
          imagen_url: string | null
          repositorio_url: string | null
          demo_url: string | null
          fecha: string | null
          estado: 'planificado' | 'en_desarrollo' | 'finalizado' | 'mantenimiento'
          destacado: boolean
          publicado: boolean
          orden_visualizacion: number
          fecha_creacion: string
          fecha_modificacion: string
        }
        Insert: Partial<Database['public']['Tables']['proyectos']['Row']>
        Update: Partial<Database['public']['Tables']['proyectos']['Row']>
        Relationships: []
      }
      tecnologias: {
        Row: {
          id_tecnologia: number
          nombre: string
          categoria: string
          icono: string | null
        }
        Insert: Partial<Database['public']['Tables']['tecnologias']['Row']>
        Update: Partial<Database['public']['Tables']['tecnologias']['Row']>
        Relationships: []
      }
      proyecto_tecnologia: {
        Row: {
          id_proyecto: number
          id_tecnologia: number
        }
        Insert: Partial<Database['public']['Tables']['proyecto_tecnologia']['Row']>
        Update: Partial<Database['public']['Tables']['proyecto_tecnologia']['Row']>
        Relationships: []
      }
      habilidades: {
        Row: {
          id_habilidad: number
          nombre: string
          categoria: string
          icono: string | null
          orden_visualizacion: number
          publicado: boolean
        }
        Insert: Partial<Database['public']['Tables']['habilidades']['Row']>
        Update: Partial<Database['public']['Tables']['habilidades']['Row']>
        Relationships: []
      }
      experiencias: {
        Row: {
          id_experiencia: number
          codigo: string | null
          titulo: string
          institucion: string | null
          descripcion: string
          fecha_inicio: string | null
          fecha_fin: string | null
          periodo_academico: string | null
          tipo: 'academica' | 'laboral' | 'proyecto' | 'voluntariado' | 'otra'
          publicado: boolean
          orden_visualizacion: number
        }
        Insert: Partial<Database['public']['Tables']['experiencias']['Row']>
        Update: Partial<Database['public']['Tables']['experiencias']['Row']>
        Relationships: []
      }
      logros: {
        Row: {
          id_logro: number
          codigo: string | null
          titulo: string
          descripcion: string | null
          institucion: string | null
          fecha: string | null
          periodo_academico: string | null
          evidencia_url: string | null
          publicado: boolean
        }
        Insert: Partial<Database['public']['Tables']['logros']['Row']>
        Update: Partial<Database['public']['Tables']['logros']['Row']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
