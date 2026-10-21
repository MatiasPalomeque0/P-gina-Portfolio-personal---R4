-- PORTFOLIO PERSONAL R4
-- Migración incremental 001: identificadores estables y períodos académicos.
--
-- Esta migración está preparada para ejecutarse en Supabase, pero no fue
-- ejecutada desde este proyecto. No elimina tablas, registros ni relaciones.
-- Las columnas codigo son nullable para no romper registros legacy existentes
-- que todavía no tengan un identificador de negocio asignado.

BEGIN;

-- 1. Agregar únicamente las columnas nuevas y evitar que un proyecto nuevo
--    quede finalizado por omisión sin evidencia revisada.
ALTER TABLE public.proyectos
    ADD COLUMN IF NOT EXISTS codigo VARCHAR(80);

ALTER TABLE public.proyectos
    ALTER COLUMN estado SET DEFAULT 'en_desarrollo';

ALTER TABLE public.experiencias
    ADD COLUMN IF NOT EXISTS codigo VARCHAR(80);

ALTER TABLE public.experiencias
    ADD COLUMN IF NOT EXISTS periodo_academico VARCHAR(30);

ALTER TABLE public.logros
    ADD COLUMN IF NOT EXISTS codigo VARCHAR(80);

ALTER TABLE public.logros
    ADD COLUMN IF NOT EXISTS periodo_academico VARCHAR(30);

-- 2. Comprobar duplicados existentes antes de agregar restricciones UNIQUE.
-- Los valores NULL se permiten para conservar registros legacy sin código.
DO $$
BEGIN
    IF EXISTS (
        SELECT codigo
        FROM public.proyectos
        WHERE codigo IS NOT NULL
        GROUP BY codigo
        HAVING COUNT(*) > 1
    ) THEN
        RAISE EXCEPTION 'No se puede agregar UNIQUE: existen codigos duplicados en public.proyectos';
    END IF;

    IF EXISTS (
        SELECT codigo
        FROM public.experiencias
        WHERE codigo IS NOT NULL
        GROUP BY codigo
        HAVING COUNT(*) > 1
    ) THEN
        RAISE EXCEPTION 'No se puede agregar UNIQUE: existen codigos duplicados en public.experiencias';
    END IF;

    IF EXISTS (
        SELECT codigo
        FROM public.logros
        WHERE codigo IS NOT NULL
        GROUP BY codigo
        HAVING COUNT(*) > 1
    ) THEN
        RAISE EXCEPTION 'No se puede agregar UNIQUE: existen codigos duplicados en public.logros';
    END IF;
END;
$$;

-- 3. Agregar las restricciones solo si todavía no existen.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'public.proyectos'::regclass
          AND conname = 'uq_proyectos_codigo'
    ) THEN
        ALTER TABLE public.proyectos
            ADD CONSTRAINT uq_proyectos_codigo UNIQUE (codigo);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'public.experiencias'::regclass
          AND conname = 'uq_experiencias_codigo'
    ) THEN
        ALTER TABLE public.experiencias
            ADD CONSTRAINT uq_experiencias_codigo UNIQUE (codigo);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'public.logros'::regclass
          AND conname = 'uq_logros_codigo'
    ) THEN
        ALTER TABLE public.logros
            ADD CONSTRAINT uq_logros_codigo UNIQUE (codigo);
    END IF;
END;
$$;

COMMIT;
