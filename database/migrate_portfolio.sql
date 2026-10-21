-- PORTFOLIO PERSONAL R4
-- Migración idempotente de los datos estáticos del portfolio a Supabase.
--
-- ORDEN OBLIGATORIO:
-- 1) Ejecutar database/migrations/001_identificadores_y_periodos.sql.
-- 2) Revisar las columnas y restricciones resultantes.
-- 3) Ejecutar este archivo.
--
-- Este archivo NO fue ejecutado desde el proyecto.
-- No elimina registros, no modifica RLS y no sobrescribe filas existentes.
-- Cuando una fila ya existe, ON CONFLICT DO NOTHING conserva todas sus
-- columnas, incluso si su valor publicado, orden, URL o metadatos difiere.

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Verificaciones de conflictos antes de insertar proyectos
-- ---------------------------------------------------------------------------
-- El codigo es el identificador técnico estable. El título se utiliza solo
-- como detector preventivo de posibles filas legacy que podrían duplicarse;
-- nunca se utiliza como clave de inserción o de relación.
DO $$
BEGIN
    IF EXISTS (
        WITH fuente(codigo, titulo, descripcion_corta, estado) AS (
            VALUES
                ('r1-react-vite', 'R1 — React + Vite', 'Aplicación educativa con ejercicios de componentes, props, estado, tareas, formularios, temas y navegación por anclas.', 'en_desarrollo'),
                ('r2-manejo-rutas', 'R2 — Manejo de Rutas', 'Lista de tareas con rutas para listado, detalle y creación, además de validación y descarga de datos.', 'en_desarrollo'),
                ('r3-sistema-usuarios', 'R3 — Sistema de Usuarios', 'Sistema full-stack con registro, login, panel protegido, API REST, sesiones seguras y persistencia en MySQL.', 'en_desarrollo')
        )
        SELECT 1
        FROM fuente f
        JOIN public.proyectos p
          ON p.codigo = f.codigo OR p.titulo = f.titulo
        WHERE p.codigo IS DISTINCT FROM f.codigo
           OR p.titulo IS DISTINCT FROM f.titulo
           OR p.descripcion_corta IS DISTINCT FROM f.descripcion_corta
           OR p.estado IS DISTINCT FROM f.estado
    ) THEN
        RAISE EXCEPTION 'Conflicto de identidad o contenido en public.proyectos. Revisar codigo y titulo antes de continuar.';
    END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- 2. Proyectos
-- ---------------------------------------------------------------------------
-- No hay fechas, imágenes, repositorios ni demos específicas en el origen;
-- por eso esos campos se mantienen NULL. publicado comienza en FALSE.
INSERT INTO public.proyectos (
    codigo,
    titulo,
    descripcion_corta,
    descripcion_completa,
    imagen_url,
    repositorio_url,
    demo_url,
    fecha,
    estado,
    destacado,
    publicado,
    orden_visualizacion
)
VALUES
    (
        'r1-react-vite',
        'R1 — React + Vite',
        'Aplicación educativa con ejercicios de componentes, props, estado, tareas, formularios, temas y navegación por anclas.',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'en_desarrollo',
        FALSE,
        FALSE,
        1
    ),
    (
        'r2-manejo-rutas',
        'R2 — Manejo de Rutas',
        'Lista de tareas con rutas para listado, detalle y creación, además de validación y descarga de datos.',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'en_desarrollo',
        FALSE,
        FALSE,
        2
    ),
    (
        'r3-sistema-usuarios',
        'R3 — Sistema de Usuarios',
        'Sistema full-stack con registro, login, panel protegido, API REST, sesiones seguras y persistencia en MySQL.',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'en_desarrollo',
        FALSE,
        FALSE,
        3
    )
ON CONFLICT (codigo) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 3. Tecnologías
-- ---------------------------------------------------------------------------
-- JSX se clasifica como Frontend porque es la única categoría deducible de
-- su uso en el proyecto R1 y la solicitud lo autoriza expresamente.
DO $$
BEGIN
    IF EXISTS (
        WITH fuente(nombre, categoria) AS (
            VALUES
                ('React', 'Frontend'),
                ('Vite', 'Herramientas'),
                ('JavaScript', 'Frontend'),
                ('JSX', 'Frontend'),
                ('CSS', 'Frontend'),
                ('TypeScript', 'Frontend'),
                ('React Router', 'Otros'),
                ('Bootstrap', 'Frontend'),
                ('Express', 'Backend'),
                ('API REST', 'Otros'),
                ('MySQL', 'Bases de datos')
        )
        SELECT 1
        FROM fuente f
        JOIN public.tecnologias t ON t.nombre = f.nombre
        WHERE t.categoria IS DISTINCT FROM f.categoria
    ) THEN
        RAISE EXCEPTION 'Conflicto de categoria en public.tecnologias. No se sobrescribieron registros existentes.';
    END IF;
END;
$$;

INSERT INTO public.tecnologias (nombre, categoria, icono)
VALUES
    ('React', 'Frontend', NULL),
    ('Vite', 'Herramientas', NULL),
    ('JavaScript', 'Frontend', NULL),
    ('JSX', 'Frontend', NULL),
    ('CSS', 'Frontend', NULL),
    ('TypeScript', 'Frontend', NULL),
    ('React Router', 'Otros', NULL),
    ('Bootstrap', 'Frontend', NULL),
    ('Express', 'Backend', NULL),
    ('API REST', 'Otros', NULL),
    ('MySQL', 'Bases de datos', NULL)
ON CONFLICT (nombre) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 4. Habilidades
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (
        WITH fuente(nombre, categoria) AS (
            VALUES
                ('HTML', 'Frontend'),
                ('CSS', 'Frontend'),
                ('JavaScript', 'Frontend'),
                ('TypeScript', 'Frontend'),
                ('React', 'Frontend'),
                ('Bootstrap', 'Frontend'),
                ('Node.js', 'Backend'),
                ('Express', 'Backend'),
                ('PHP', 'Backend'),
                ('MySQL', 'Bases de datos'),
                ('SQL', 'Bases de datos'),
                ('Git', 'Herramientas'),
                ('GitHub', 'Herramientas'),
                ('Vite', 'Herramientas'),
                ('VS Code', 'Herramientas'),
                ('Responsive design', 'Otros'),
                ('APIs REST', 'Otros'),
                ('React Router', 'Otros')
        )
        SELECT 1
        FROM fuente f
        JOIN public.habilidades h ON h.nombre = f.nombre
        WHERE h.categoria IS DISTINCT FROM f.categoria
    ) THEN
        RAISE EXCEPTION 'Conflicto de categoria en public.habilidades. No se sobrescribieron registros existentes.';
    END IF;
END;
$$;

INSERT INTO public.habilidades (nombre, categoria, icono, orden_visualizacion, publicado)
VALUES
    ('HTML', 'Frontend', NULL, 1, FALSE),
    ('CSS', 'Frontend', NULL, 2, FALSE),
    ('JavaScript', 'Frontend', NULL, 3, FALSE),
    ('TypeScript', 'Frontend', NULL, 4, FALSE),
    ('React', 'Frontend', NULL, 5, FALSE),
    ('Bootstrap', 'Frontend', NULL, 6, FALSE),
    ('Node.js', 'Backend', NULL, 7, FALSE),
    ('Express', 'Backend', NULL, 8, FALSE),
    ('PHP', 'Backend', NULL, 9, FALSE),
    ('MySQL', 'Bases de datos', NULL, 10, FALSE),
    ('SQL', 'Bases de datos', NULL, 11, FALSE),
    ('Git', 'Herramientas', NULL, 12, FALSE),
    ('GitHub', 'Herramientas', NULL, 13, FALSE),
    ('Vite', 'Herramientas', NULL, 14, FALSE),
    ('VS Code', 'Herramientas', NULL, 15, FALSE),
    ('Responsive design', 'Otros', NULL, 16, FALSE),
    ('APIs REST', 'Otros', NULL, 17, FALSE),
    ('React Router', 'Otros', NULL, 18, FALSE)
ON CONFLICT (nombre) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 5. Experiencias
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (
        WITH fuente(codigo, titulo, institucion, descripcion, tipo, periodo_academico) AS (
            VALUES
                ('experiencia-r1', 'React + Vite', 'Trabajo práctico de frontend', 'Aplicación educativa para practicar componentes, props, estado, listas, formularios, navegación y estilos responsive.', 'proyecto', 'R1'),
                ('experiencia-r2', 'Manejo de Rutas', 'Lista de tareas con React Router', 'Aplicación de tareas con TypeScript, rutas reales, formulario de creación, detalle y descarga de datos en JSON.', 'proyecto', 'R2'),
                ('experiencia-r3', 'Sistema de Usuarios', 'Proyecto full-stack', 'Sistema con React, Express, API REST y MySQL, incluyendo autenticación, persistencia, validaciones y protección de sesión.', 'proyecto', 'R3')
        )
        SELECT 1
        FROM fuente f
        JOIN public.experiencias e
          ON e.codigo = f.codigo OR e.titulo = f.titulo
        WHERE e.codigo IS DISTINCT FROM f.codigo
           OR e.titulo IS DISTINCT FROM f.titulo
           OR e.institucion IS DISTINCT FROM f.institucion
           OR e.descripcion IS DISTINCT FROM f.descripcion
           OR e.tipo IS DISTINCT FROM f.tipo
           OR e.periodo_academico IS DISTINCT FROM f.periodo_academico
    ) THEN
        RAISE EXCEPTION 'Conflicto de identidad o contenido en public.experiencias. Revisar codigo y titulo antes de continuar.';
    END IF;
END;
$$;

INSERT INTO public.experiencias (
    codigo,
    titulo,
    institucion,
    descripcion,
    fecha_inicio,
    fecha_fin,
    periodo_academico,
    tipo,
    publicado,
    orden_visualizacion
)
VALUES
    (
        'experiencia-r1',
        'React + Vite',
        'Trabajo práctico de frontend',
        'Aplicación educativa para practicar componentes, props, estado, listas, formularios, navegación y estilos responsive.',
        NULL,
        NULL,
        'R1',
        'proyecto',
        FALSE,
        1
    ),
    (
        'experiencia-r2',
        'Manejo de Rutas',
        'Lista de tareas con React Router',
        'Aplicación de tareas con TypeScript, rutas reales, formulario de creación, detalle y descarga de datos en JSON.',
        NULL,
        NULL,
        'R2',
        'proyecto',
        FALSE,
        2
    ),
    (
        'experiencia-r3',
        'Sistema de Usuarios',
        'Proyecto full-stack',
        'Sistema con React, Express, API REST y MySQL, incluyendo autenticación, persistencia, validaciones y protección de sesión.',
        NULL,
        NULL,
        'R3',
        'proyecto',
        FALSE,
        3
    )
ON CONFLICT (codigo) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 6. Logros
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (
        WITH fuente(codigo, titulo, descripcion, periodo_academico) AS (
            VALUES
                ('logro-r1', 'Componentes, props y estado', 'Construcción de una interfaz React con componentes reutilizables, estado local, formularios y listas.', 'R1'),
                ('logro-r2', 'Navegación SPA con rutas reales', 'Implementación de React Router para separar listado, detalle y creación de tareas sin perder la navegación de la aplicación.', 'R2'),
                ('logro-r3', 'React + API REST + MySQL', 'Conexión de un frontend React con un backend Express y persistencia de usuarios en MySQL.', 'R3')
        )
        SELECT 1
        FROM fuente f
        JOIN public.logros l
          ON l.codigo = f.codigo OR l.titulo = f.titulo
        WHERE l.codigo IS DISTINCT FROM f.codigo
           OR l.titulo IS DISTINCT FROM f.titulo
           OR l.descripcion IS DISTINCT FROM f.descripcion
           OR l.periodo_academico IS DISTINCT FROM f.periodo_academico
    ) THEN
        RAISE EXCEPTION 'Conflicto de identidad o contenido en public.logros. Revisar codigo y titulo antes de continuar.';
    END IF;
END;
$$;

INSERT INTO public.logros (
    codigo,
    titulo,
    descripcion,
    institucion,
    fecha,
    periodo_academico,
    evidencia_url,
    publicado
)
VALUES
    (
        'logro-r1',
        'Componentes, props y estado',
        'Construcción de una interfaz React con componentes reutilizables, estado local, formularios y listas.',
        NULL,
        NULL,
        'R1',
        NULL,
        FALSE
    ),
    (
        'logro-r2',
        'Navegación SPA con rutas reales',
        'Implementación de React Router para separar listado, detalle y creación de tareas sin perder la navegación de la aplicación.',
        NULL,
        NULL,
        'R2',
        NULL,
        FALSE
    ),
    (
        'logro-r3',
        'React + API REST + MySQL',
        'Conexión de un frontend React con un backend Express y persistencia de usuarios en MySQL.',
        NULL,
        NULL,
        'R3',
        NULL,
        FALSE
    )
ON CONFLICT (codigo) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 7. Relaciones proyecto-tecnología
-- ---------------------------------------------------------------------------
WITH relaciones(codigo_proyecto, nombre_tecnologia) AS (
    VALUES
        ('r1-react-vite', 'React'),
        ('r1-react-vite', 'Vite'),
        ('r1-react-vite', 'JavaScript'),
        ('r1-react-vite', 'JSX'),
        ('r1-react-vite', 'CSS'),
        ('r2-manejo-rutas', 'React'),
        ('r2-manejo-rutas', 'TypeScript'),
        ('r2-manejo-rutas', 'Vite'),
        ('r2-manejo-rutas', 'React Router'),
        ('r2-manejo-rutas', 'Bootstrap'),
        ('r3-sistema-usuarios', 'React'),
        ('r3-sistema-usuarios', 'TypeScript'),
        ('r3-sistema-usuarios', 'Express'),
        ('r3-sistema-usuarios', 'API REST'),
        ('r3-sistema-usuarios', 'MySQL')
)
INSERT INTO public.proyecto_tecnologia (id_proyecto, id_tecnologia)
SELECT p.id_proyecto, t.id_tecnologia
FROM relaciones r
JOIN public.proyectos p ON p.codigo = r.codigo_proyecto
JOIN public.tecnologias t ON t.nombre = r.nombre_tecnologia
ON CONFLICT (id_proyecto, id_tecnologia) DO NOTHING;

-- Verificación dentro de la transacción: todas las relaciones esperadas deben
-- existir antes de confirmar los cambios.
DO $$
DECLARE
    relaciones_faltantes INTEGER;
BEGIN
    WITH relaciones(codigo_proyecto, nombre_tecnologia) AS (
        VALUES
            ('r1-react-vite', 'React'),
            ('r1-react-vite', 'Vite'),
            ('r1-react-vite', 'JavaScript'),
            ('r1-react-vite', 'JSX'),
            ('r1-react-vite', 'CSS'),
            ('r2-manejo-rutas', 'React'),
            ('r2-manejo-rutas', 'TypeScript'),
            ('r2-manejo-rutas', 'Vite'),
            ('r2-manejo-rutas', 'React Router'),
            ('r2-manejo-rutas', 'Bootstrap'),
            ('r3-sistema-usuarios', 'React'),
            ('r3-sistema-usuarios', 'TypeScript'),
            ('r3-sistema-usuarios', 'Express'),
            ('r3-sistema-usuarios', 'API REST'),
            ('r3-sistema-usuarios', 'MySQL')
    )
    SELECT COUNT(*)
    INTO relaciones_faltantes
    FROM relaciones r
    LEFT JOIN public.proyectos p ON p.codigo = r.codigo_proyecto
    LEFT JOIN public.tecnologias t ON t.nombre = r.nombre_tecnologia
    LEFT JOIN public.proyecto_tecnologia pt
      ON pt.id_proyecto = p.id_proyecto
     AND pt.id_tecnologia = t.id_tecnologia
    WHERE pt.id_proyecto IS NULL;

    IF relaciones_faltantes > 0 THEN
        RAISE EXCEPTION 'La migracion no pudo crear % relaciones proyecto-tecnologia esperadas.', relaciones_faltantes;
    END IF;
END;
$$;

COMMIT;
