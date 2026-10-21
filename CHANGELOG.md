# Changelog

## [Unreleased] — 2026-10-21

### Seguridad y dependencias

- Actualizado Vite de `8.3.0` a `8.3.5`, versión compatible que corrige los avisos de `launch-editor`.
- Resuelta la dependencia transitive `source-map-js` de `1.2.1` a `1.2.2` mediante la actualización compatible de Vite/PostCSS.
- Ajustado TypeScript de `7.0.2` a `6.0.3`, porque `typescript-eslint` no soportaba TypeScript 7 y fallaba al iniciar ESLint.
- Añadido ESLint 10 con configuración flat para TypeScript, hooks de React y React Refresh.
- No se utilizó `npm audit fix --force`.

### Integración Supabase

- Se conserva el cliente tipado, los servicios de lectura, la caché en memoria y los estados de carga/error/reintento.
- Se verificó que `.env.local` está ignorado y que no hay credenciales completas en archivos versionables.
- Se mantuvieron sin cambios las tablas, las políticas RLS, Vercel y el dominio.

### Verificaciones

- `npm ci`: correcto.
- `npx tsc -b --pretty false`: correcto.
- `npm run lint`: correcto.
- `npm run build`: correcto con Vite `8.3.5`.
- `npm audit`: 0 vulnerabilidades.
- `npm audit --omit=dev`: 0 vulnerabilidades.
- Consulta real de Supabase: 3 proyectos, 15 relaciones, 18 habilidades, 3 experiencias y 3 logros.
- Cada proyecto publicó 5 tecnologías.
- Localhost mostró las cuatro secciones dinámicas sin errores de consola.
- Se comprobaron navegación por anclas, carga, error y reintento.
- Las 3 categorías visuales coincidieron con los títulos publicados de Supabase.

La publicación en Vercel todavía no fue modificada.
