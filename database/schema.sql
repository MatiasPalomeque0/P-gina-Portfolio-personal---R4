
-- PORTFOLIO PERSONAL R4
-- Esquema de referencia de la estructura final prevista.
--
-- IMPORTANTE:
-- Este archivo refleja las columnas codigo y periodo_academico que se
-- incorporan mediante database/migrations/001_identificadores_y_periodos.sql.
-- Si las seis tablas ya existen, ejecutar primero esa migración incremental.
-- Este archivo no demuestra que los cambios ya hayan sido aplicados en Supabase.
-- No elimina tablas ni datos existentes.

BEGIN;

-- 1. PROYECTOS
CREATE TABLE IF NOT EXISTS public.proyectos (
    id_proyecto BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo VARCHAR(80),
    titulo VARCHAR(150) NOT NULL,
    descripcion_corta VARCHAR(300) NOT NULL,
    descripcion_completa TEXT,
    imagen_url TEXT,
    repositorio_url TEXT,
    demo_url TEXT,
    fecha DATE,
    estado VARCHAR(20) NOT NULL DEFAULT 'en_desarrollo',
    destacado BOOLEAN NOT NULL DEFAULT FALSE,
    publicado BOOLEAN NOT NULL DEFAULT FALSE,
    orden_visualizacion INTEGER NOT NULL DEFAULT 0,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    fecha_modificacion TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_proyectos_codigo UNIQUE (codigo),
    CONSTRAINT chk_proyecto_titulo CHECK (LENGTH(TRIM(titulo)) >= 2),
    CONSTRAINT chk_proyecto_descripcion CHECK (LENGTH(TRIM(descripcion_corta)) >= 5),
    CONSTRAINT chk_proyecto_estado CHECK (
        estado IN ('planificado', 'en_desarrollo', 'finalizado', 'mantenimiento')
    ),
    CONSTRAINT chk_proyecto_orden CHECK (orden_visualizacion >= 0),
    CONSTRAINT chk_proyecto_repo_url CHECK (
        repositorio_url IS NULL OR repositorio_url ~* '^https://[^[:space:]]+$'
    ),
    CONSTRAINT chk_proyecto_demo_url CHECK (
        demo_url IS NULL OR demo_url ~* '^https://[^[:space:]]+$'
    )
);

-- 2. TECNOLOGÍAS
CREATE TABLE IF NOT EXISTS public.tecnologias (
    id_tecnologia BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL UNIQUE,
    categoria VARCHAR(80) NOT NULL,
    icono TEXT,
    CONSTRAINT chk_tecnologia_nombre CHECK (LENGTH(TRIM(nombre)) >= 1)
);

-- 3. RELACIÓN MUCHOS A MUCHOS
CREATE TABLE IF NOT EXISTS public.proyecto_tecnologia (
    id_proyecto BIGINT NOT NULL REFERENCES public.proyectos(id_proyecto) ON DELETE CASCADE,
    id_tecnologia BIGINT NOT NULL REFERENCES public.tecnologias(id_tecnologia) ON DELETE RESTRICT,
    PRIMARY KEY (id_proyecto, id_tecnologia)
);

-- 4. HABILIDADES
CREATE TABLE IF NOT EXISTS public.habilidades (
    id_habilidad BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    categoria VARCHAR(80) NOT NULL,
    icono TEXT,
    orden_visualizacion INTEGER NOT NULL DEFAULT 0,
    publicado BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT chk_habilidad_orden CHECK (orden_visualizacion >= 0)
);

-- 5. EXPERIENCIAS
CREATE TABLE IF NOT EXISTS public.experiencias (
    id_experiencia BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo VARCHAR(80),
    titulo VARCHAR(150) NOT NULL,
    institucion VARCHAR(150),
    descripcion TEXT NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    periodo_academico VARCHAR(30),
    tipo VARCHAR(30) NOT NULL DEFAULT 'academica',
    publicado BOOLEAN NOT NULL DEFAULT FALSE,
    orden_visualizacion INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT uq_experiencias_codigo UNIQUE (codigo),
    CONSTRAINT chk_experiencia_fechas CHECK (
        fecha_inicio IS NULL OR fecha_fin IS NULL OR fecha_fin >= fecha_inicio
    ),
    CONSTRAINT chk_experiencia_tipo CHECK (
        tipo IN ('academica', 'laboral', 'proyecto', 'voluntariado', 'otra')
    ),
    CONSTRAINT chk_experiencia_orden CHECK (orden_visualizacion >= 0)
);

-- 6. LOGROS
CREATE TABLE IF NOT EXISTS public.logros (
    id_logro BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo VARCHAR(80),
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    institucion VARCHAR(150),
    fecha DATE,
    periodo_academico VARCHAR(30),
    evidencia_url TEXT,
    publicado BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT uq_logros_codigo UNIQUE (codigo),
    CONSTRAINT chk_logro_evidencia_url CHECK (
        evidencia_url IS NULL OR evidencia_url ~* '^https://[^[:space:]]+$'
    )
);

-- Índices para consultas de contenido publicado.
CREATE INDEX IF NOT EXISTS idx_proyectos_publicados
    ON public.proyectos (orden_visualizacion, id_proyecto)
    WHERE publicado = TRUE;

CREATE INDEX IF NOT EXISTS idx_habilidades_publicadas
    ON public.habilidades (orden_visualizacion, id_habilidad)
    WHERE publicado = TRUE;

CREATE INDEX IF NOT EXISTS idx_experiencias_publicadas
    ON public.experiencias (orden_visualizacion, id_experiencia)
    WHERE publicado = TRUE;

-- Activar RLS en las seis tablas.
ALTER TABLE public.proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tecnologias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proyecto_tecnologia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habilidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logros ENABLE ROW LEVEL SECURITY;

-- Permisos de acceso de solo lectura para visitantes.
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON TABLE
    public.proyectos,
    public.tecnologias,
    public.proyecto_tecnologia,
    public.habilidades,
    public.experiencias,
    public.logros
TO anon;

-- Políticas de lectura pública limitadas.
CREATE POLICY "Consultar proyectos publicados"
ON public.proyectos FOR SELECT TO anon
USING (publicado = TRUE);

CREATE POLICY "Consultar tecnologias de proyectos publicados"
ON public.tecnologias FOR SELECT TO anon
USING (
    EXISTS (
        SELECT 1
        FROM public.proyecto_tecnologia pt
        JOIN public.proyectos p ON p.id_proyecto = pt.id_proyecto
        WHERE pt.id_tecnologia = tecnologias.id_tecnologia
          AND p.publicado = TRUE
    )
);

CREATE POLICY "Consultar relaciones de proyectos publicados"
ON public.proyecto_tecnologia FOR SELECT TO anon
USING (
    EXISTS (
        SELECT 1
        FROM public.proyectos p
        WHERE p.id_proyecto = proyecto_tecnologia.id_proyecto
          AND p.publicado = TRUE
    )
);

CREATE POLICY "Consultar habilidades publicadas"
ON public.habilidades FOR SELECT TO anon
USING (publicado = TRUE);

CREATE POLICY "Consultar experiencias publicadas"
ON public.experiencias FOR SELECT TO anon
USING (publicado = TRUE);

CREATE POLICY "Consultar logros publicados"
ON public.logros FOR SELECT TO anon
USING (publicado = TRUE);

COMMIT;
