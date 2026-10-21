# Migración segura del portfolio a Supabase

## Estado

**Preparada para revisión. No ejecutada en Supabase.**

Se prepararon dos archivos SQL:

- `database/migrations/001_identificadores_y_periodos.sql`
- `database/migrate_portfolio.sql`

La migración no fue ejecutada, no se modificó React, no se modificó Vercel, no se modificó RLS y no se realizaron commits ni push.

## Fuentes revisadas

- `database/schema.sql`.
- `src/data/portfolio.ts`.
- `src/App.tsx`.
- `src/components/Habilidades.tsx`.
- `src/components/Proyectos.tsx`.
- `src/components/ProyectoCard.tsx`.
- `src/components/Experiencia.tsx`.
- `src/components/Logros.tsx`.
- `src/components/Contacto.tsx`.

Actualmente `src/App.tsx` importa el contenido estático desde `src/data/portfolio.ts` y lo entrega mediante props. Esta etapa solamente prepara la carga SQL; no cambia todavía la fuente de datos de React.

## Cambios de esquema propuestos

El esquema de referencia `database/schema.sql` fue actualizado para reflejar la estructura final prevista. El esquema actualizado todavía no significa que esos cambios estén aplicados en Supabase.

La migración incremental `001_identificadores_y_periodos.sql` agrega:

### `proyectos`

- `codigo VARCHAR(80)`.
- `UNIQUE (codigo)` mediante `uq_proyectos_codigo`.

### `experiencias`

- `codigo VARCHAR(80)`.
- `periodo_academico VARCHAR(30)`.
- `UNIQUE (codigo)` mediante `uq_experiencias_codigo`.

### `logros`

- `codigo VARCHAR(80)`.
- `periodo_academico VARCHAR(30)`.
- `UNIQUE (codigo)` mediante `uq_logros_codigo`.

Además, deja `proyectos.estado` con valor por defecto `en_desarrollo`. Esto evita que una inserción futura sin estado explícito marque un proyecto como `finalizado` sin evidencia revisada. No cambia el estado de ningún proyecto existente.

Las columnas `codigo` se agregan como nullable para no romper registros existentes que todavía no tengan un identificador técnico. Los registros nuevos de esta migración siempre reciben un código.

La migración comprueba primero si existen códigos duplicados y se detiene con un error antes de agregar las restricciones. Puede ejecutarse nuevamente sin intentar agregar columnas o restricciones duplicadas.

No modifica claves primarias, claves foráneas, tablas existentes, políticas RLS ni registros existentes.

## Identificadores estables

### Proyectos

| Código | Registro |
| --- | --- |
| `r1-react-vite` | R1 — React + Vite |
| `r2-manejo-rutas` | R2 — Manejo de Rutas |
| `r3-sistema-usuarios` | R3 — Sistema de Usuarios |

### Experiencias

| Código | Registro |
| --- | --- |
| `experiencia-r1` | React + Vite |
| `experiencia-r2` | Manejo de Rutas |
| `experiencia-r3` | Sistema de Usuarios |

### Logros

| Código | Registro |
| --- | --- |
| `logro-r1` | Componentes, props y estado |
| `logro-r2` | Navegación SPA con rutas reales |
| `logro-r3` | React + API REST + MySQL |

Los códigos son identificadores técnicos y no contienen fechas ni datos personales.

## Datos preparados

### Proyectos: 3

Se migran los proyectos R1, R2 y R3 con:

- título.
- descripción corta.
- estado `en_desarrollo` de forma conservadora: `portfolio.ts` los describe como `Terminado`, pero no contiene repositorios, demos, imágenes ni otra evidencia verificable para justificar `finalizado` en la base pública.
- `destacado = FALSE`.
- `publicado = FALSE`.
- orden de visualización del 1 al 3.

No se inventan ni se agregan fechas, imágenes, repositorios específicos, demos ni descripciones completas no presentes en el origen. Los campos faltantes quedan en `NULL`.

El archivo `src/data/portfolio.ts` no se modifica. Para cambiar un proyecto a `finalizado` será necesario aportar y revisar evidencia real en una etapa posterior; esta migración no lo hace automáticamente.

### Tecnologías: 11

Se insertan las tecnologías únicas utilizadas por los proyectos:

- React — Frontend.
- Vite — Herramientas.
- JavaScript — Frontend.
- JSX — Frontend.
- CSS — Frontend.
- TypeScript — Frontend.
- React Router — Otros.
- Bootstrap — Frontend.
- Express — Backend.
- API REST — Otros.
- MySQL — Bases de datos.

La clasificación `JSX → Frontend` fue incorporada porque fue autorizada expresamente y se deduce de su uso en el proyecto R1. No se agregan otras categorías nuevas.

Las tecnologías se insertan con `ON CONFLICT (nombre) DO NOTHING`. Si una tecnología ya existe con otra categoría, la migración se detiene para evitar sobrescribirla.

### Habilidades: 18

Se insertan las 18 habilidades existentes en `src/data/portfolio.ts`, con su categoría existente, `icono = NULL`, el orden de aparición del archivo fuente y `publicado = FALSE`.

Las habilidades utilizan la restricción existente `UNIQUE (nombre)` mediante `ON CONFLICT (nombre) DO NOTHING`. Si una categoría existente no coincide, la migración se detiene.

### Experiencias: 3

Se migran R1, R2 y R3 como experiencias de tipo `proyecto`.

- `fecha_inicio = NULL`.
- `fecha_fin = NULL`.
- `periodo_academico` conserva `R1`, `R2` o `R3`.
- `publicado = FALSE`.

No se convierten los períodos académicos en fechas ficticias.

### Logros: 3

Se migran los tres logros existentes.

- `fecha = NULL`.
- `institucion = NULL`.
- `evidencia_url = NULL`.
- `periodo_academico` conserva `R1`, `R2` o `R3`.
- `publicado = FALSE`.

No se inventan certificaciones, instituciones, fechas ni evidencias.

## Columnas que se conservan cuando el registro ya existe

La migración no actualiza filas existentes. `ON CONFLICT DO NOTHING` conserva todos los valores que ya tenga la fila que provoque el conflicto, incluidos los siguientes campos que no se completan desde el origen:

| Tabla | Conflicto | Columnas existentes que se conservan |
| --- | --- | --- |
| `proyectos` | `codigo` | `descripcion_completa`, `imagen_url`, `repositorio_url`, `demo_url`, `fecha`, `destacado`, `publicado`, `orden_visualizacion` y también los campos base si el registro ya existe |
| `tecnologias` | `nombre` | `categoria`, `icono` y cualquier otro valor existente |
| `habilidades` | `nombre` | `categoria`, `icono`, `orden_visualizacion`, `publicado` y cualquier otro valor existente |
| `experiencias` | `codigo` | `fecha_inicio`, `fecha_fin`, `publicado`, `orden_visualizacion` y cualquier otro valor existente |
| `logros` | `codigo` | `institucion`, `fecha`, `evidencia_url`, `publicado` y cualquier otro valor existente |
| `proyecto_tecnologia` | `(id_proyecto, id_tecnologia)` | la relación existente; no se crean duplicados |

Antes de insertar, las verificaciones comparan los campos de identidad y contenido principal. Si un mismo código o título ya existe con datos incompatibles, la transacción se detiene con una excepción; no se oculta la diferencia con `ON CONFLICT DO NOTHING`.

## Relaciones

Se preparan 15 relaciones en `proyecto_tecnologia`:

- R1: 5 tecnologías.
- R2: 5 tecnologías.
- R3: 5 tecnologías.

Las relaciones se resuelven consultando `codigo` de proyecto y `nombre` de tecnología. No se utilizan IDs numéricos fijos.

La clave primaria compuesta existente `(id_proyecto, id_tecnologia)` se utiliza con `ON CONFLICT DO NOTHING`.

## Idempotencia y protección de datos

La migración de datos:

- utiliza una transacción.
- usa `ON CONFLICT` únicamente donde existe una restricción compatible.
- no borra registros.
- no actualiza filas existentes.
- no sobrescribe contenido desconocido.
- valida conflictos de código, título y contenido antes de insertar.
- se detiene si un código existente corresponde a información diferente.
- verifica que las 15 relaciones esperadas existan antes de confirmar.

`ON CONFLICT DO NOTHING` no sirve como actualización ni como conciliación de datos: solamente evita insertar otra fila. Por eso los campos no comparados de una fila existente se conservan deliberadamente y deben revisarse con las consultas de verificación.

Los registros existentes con códigos `NULL` no se completan automáticamente, porque asignarles códigos sin revisión podría alterar la identidad de datos ajenos.

## Orden de ejecución en Supabase

No ejecutar desde este proyecto sin revisar primero los archivos.

1. Revisar los registros existentes en las seis tablas.
2. Ejecutar `database/migrations/001_identificadores_y_periodos.sql`.
3. Verificar las nuevas columnas y restricciones.
4. Revisar que la tabla `proyecto_tecnologia` mantenga sus claves foráneas.
5. Ejecutar `database/migrate_portfolio.sql`.
6. Verificar las cantidades insertadas.
7. Verificar las relaciones proyecto–tecnología.
8. Verificar que los registros nuevos tengan `publicado = FALSE`.
9. Repetir ambos scripts en un entorno aislado para comprobar idempotencia.
10. Revisar manualmente el contenido antes de publicar registros.

## Consultas de verificación sugeridas

Estas consultas son de lectura y deben ejecutarse después de revisar y aplicar los scripts:

```sql
SELECT codigo, titulo, publicado
FROM public.proyectos
ORDER BY orden_visualizacion, id_proyecto;

SELECT nombre, categoria
FROM public.tecnologias
ORDER BY nombre;

SELECT nombre, categoria, publicado
FROM public.habilidades
ORDER BY orden_visualizacion, id_habilidad;

SELECT codigo, titulo, periodo_academico, publicado
FROM public.experiencias
ORDER BY orden_visualizacion, id_experiencia;

SELECT codigo, titulo, periodo_academico, publicado
FROM public.logros
ORDER BY id_logro;

SELECT p.codigo AS proyecto, t.nombre AS tecnologia
FROM public.proyecto_tecnologia pt
JOIN public.proyectos p ON p.id_proyecto = pt.id_proyecto
JOIN public.tecnologias t ON t.id_tecnologia = pt.id_tecnologia
ORDER BY p.orden_visualizacion, t.nombre;
```

## Verificación de RLS

La migración no modifica RLS. Antes de publicar datos, comprobar en Supabase que:

- RLS continúa habilitado en las seis tablas.
- Las políticas de lectura pública solo permiten filas con `publicado = TRUE` donde corresponda.
- No existe ninguna política pública de `INSERT`, `UPDATE` o `DELETE`.
- Los registros insertados con `publicado = FALSE` no son visibles para visitantes anónimos.

La comprobación de acceso anónimo debe realizarse con una sesión o cliente anónimo controlado, no utilizando una clave privilegiada en el frontend.

## Pendientes antes de publicar

- Revisar manualmente los 3 proyectos, 3 experiencias y 3 logros.
- Aportar evidencia verificable antes de cambiar el estado de cualquier proyecto a `finalizado`.
- Confirmar las categorías y descripciones.
- Agregar URLs, imágenes, fechas o evidencias solamente si Matías las proporciona y autoriza.
- Cambiar `publicado` a `TRUE` únicamente para registros completos y revisados.
- Integrar Supabase en React en una etapa posterior.
