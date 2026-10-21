# Integración React + Supabase

## Estado

La integración local está activa. React consulta Supabase mediante `@supabase/supabase-js` y conserva `src/data/portfolio.ts` para los datos estáticos y como respaldo de referencia durante esta etapa. Las exportaciones dinámicas de ese archivo ya no se utilizan para renderizar proyectos, habilidades, experiencias ni logros.

No se modificaron tablas, políticas RLS, Vercel, el dominio ni se ejecutaron escrituras sobre la base de datos.

## Cliente y variables

El cliente tipado está en `src/lib/supabase.ts` y utiliza exclusivamente:

- `VITE_SUPABASE_URL`.
- `VITE_SUPABASE_PUBLISHABLE_KEY`.

Las variables se leen mediante `import.meta.env` y se validan al iniciar la aplicación. No se imprime ningún valor de configuración. La clave `service_role` no debe utilizarse en el navegador.

Configurar localmente `.env.local`:

```env
VITE_SUPABASE_URL=URL_DEL_PROYECTO
VITE_SUPABASE_PUBLISHABLE_KEY=CLAVE_PUBLISHABLE
```

`.env.local` está excluido por `.gitignore`. `.env.example` no contiene credenciales y sí puede versionarse.

## Consultas

Las funciones están en `src/services/portfolioService.ts`:

### Proyectos y tecnologías

Consulta `proyectos` con:

```text
select id_proyecto, codigo, titulo, descripcion_corta,
       imagen_url, repositorio_url, demo_url, fecha, estado,
       destacado, orden_visualizacion,
       proyecto_tecnologia (
         id_tecnologia,
         tecnologias (id_tecnologia, nombre, categoria, icono)
       )
```

Filtra `publicado = true`, ordena por `orden_visualizacion` e `id_proyecto`, y resuelve las tecnologías mediante la relación `proyecto_tecnologia`. No usa IDs numéricos fijos.

### Habilidades

Consulta `habilidades` con `publicado = true` y ordena por `orden_visualizacion` e `id_habilidad`.

### Experiencias

Consulta `experiencias` con `publicado = true` y ordena por `orden_visualizacion` e `id_experiencia`.

### Logros

Consulta `logros` con `publicado = true` y ordena por `id_logro`.

Todas las consultas son de lectura. React no ejecuta `insert`, `update`, `upsert` ni `delete`.

## Estado de la interfaz

`src/hooks/usePortfolioData.ts` centraliza la carga. Usa una solicitud compartida y una caché en memoria para evitar consultas duplicadas, incluso durante el montaje de desarrollo con `StrictMode`.

Cada sección dinámica maneja:

- `loading`: mensaje de carga accesible.
- `error`: mensaje visible y botón `Reintentar`.
- `success` sin filas: estado vacío explícito.
- `success` con filas: renderizado de los datos de Supabase.

Si Supabase falla, no se muestran automáticamente los proyectos, habilidades, experiencias o logros estáticos de `portfolio.ts`. El perfil, educación, presentación, contacto y la lista de tecnologías favoritas permanecen estáticos porque no tienen una columna equivalente en las tablas actuales.

El esquema actual de `proyectos` no tiene una columna `categoria`. Para conservar la presentación existente, la etiqueta visual de categoría se toma de `portfolio.ts` y se asocia por el título recibido desde Supabase. Si el título cambia o aparece un proyecto nuevo, se omite esa etiqueta; no se inventa una categoría.

## Seguridad y RLS

La aplicación usa la clave publishable, adecuada para un cliente público, y depende de RLS para limitar la lectura. Las consultas filtran `publicado = true`; las políticas de Supabase deben seguir permitiendo únicamente `SELECT` público sobre contenido publicado.

No se agregaron políticas desde React ni se incorporaron conexiones PostgreSQL directas al navegador.

## Verificaciones realizadas

Consulta real ejecutada con `.env.local`, sin imprimir valores sensibles:

- 3 proyectos publicados.
- 15 relaciones proyecto-tecnología.
- 5 tecnologías por proyecto.
- 18 habilidades publicadas.
- 3 experiencias publicadas.
- 3 logros publicados.

También se verificó localhost:

- La pantalla inicial muestra los datos recibidos desde Supabase.
- El navegador no reportó errores ni advertencias.
- Con una configuración temporal inválida, las cuatro secciones mostraron el estado de error.
- El botón `Reintentar` volvió a ejecutar la carga y conservó el manejo del error.
- La configuración temporal fue eliminada al terminar la prueba.

`npm run build` finaliza correctamente. No existe un script `lint` en `package.json`, por lo que no se ejecutó lint.

## Ejecución local

```bash
npm install
npm run dev
```

Después de modificar `.env.local`, reiniciar Vite para que vuelva a leer las variables.
