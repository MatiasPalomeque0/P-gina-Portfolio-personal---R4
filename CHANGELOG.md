# Changelog

## Preview responsive y controles — 2026-10-21

### Correcciones

- Confirmado con hit testing y clic real que `Hero::before` interceptaba los enlaces de Inicio. Se desactivó la recepción de eventos del adorno y se posicionó el contenido por encima, conservando las tres anclas nativas.
- Ajustada la separación de las anclas respecto del Navbar y restauración única del hash inicial después de cargar los datos, también al recargar un enlace directo.
- Contacto: columnas flexibles, `min-width: 0`, `overflow-wrap: anywhere`, etiqueta sobre el valor en móvil y correo de 16 px sin recortes.
- Eliminados el ancho mínimo del body que desbordaba al incluir la barra de scroll y `overflow-x: hidden`. El layout se valida sin ocultar el desborde.
- Menú móvil hasta 980 px; cerrado queda fuera de la navegación por teclado. Escape cierra el menú y restaura el foco. Se conserva su funcionalidad original.

### Controles flotantes

- Nuevo componente reutilizable `FloatingControls.tsx`, con iconos SVG, botones de 48 px, `aria-label`, foco visible, teclado, toque y áreas seguras.
- Tema claro/oscuro con variables CSS, inicialización previa al primer render, preferencia del sistema y persistencia en `localStorage`. Alternativa de sesión si el almacenamiento está bloqueado.
- Volver al inicio visible después de 400 px de scroll; desplazamiento suave que respeta movimiento reducido. Limpieza de listeners al desmontar.
- Espacio al final del footer para poder leer su contenido sin quedar detrás de los controles. Ajuste leve del texto secundario oscuro para mejorar el contraste.

### Validación local

- TypeScript, ESLint y build: correctos. `npm audit` y `npm audit --omit=dev`: 0 vulnerabilidades.
- Playwright/Edge: 320, 360, 375, 390 y 768 px con toque emulado y teclado; 1024 y 1920 px con mouse y teclado.
- Los tres enlaces del Hero y las ocho anclas funcionaron en todos los tamaños, con los destinos debajo del Navbar. Sin desborde horizontal ni correo recortado en claro u oscuro.
- Tema del sistema claro/oscuro, cambio, persistencia al recargar (incluidos tres primeros fotogramas), movimiento reducido y almacenamiento bloqueado: correctos.
- Menú, Escape, foco, controles de 48 px, Volver arriba y animaciones: correctos. Sin errores de consola.
- Supabase real, en todos los tamaños: 3 proyectos, 15 relaciones con tecnologías (5 por proyecto), 18 habilidades, 3 experiencias y 3 logros. Cliente, servicios, SQL, datos y RLS conservados.
- Build servido con `vite preview`, ancla inicial de Contacto, apertura de GitHub y cuatro peticiones GET sin duplicados: correctos. Sin errores de JavaScript.
- Respaldo anterior: rama local `backup/pre-responsive-2026-10-21`, commit `e912ed5`. Publicación limitada a `preview/portfolio-supabase`.
- Pendiente de hardware: Safari/iOS y Android físicos; los toques se verificaron en emulación Chromium.

### Validación remota de la Preview

- Completada el 2026-10-21 tras iniciar sesión en Vercel; se validó la versión de código publicada en `39445d9`.
- Supabase: 3 proyectos con 5 tecnologías cada uno, 18 habilidades, 3 experiencias y 3 logros visibles en el despliegue.
- Anchos 320, 360, 375, 390, 768, 1024 y 1920 px: sin desborde horizontal, correo recortado ni tarjetas fuera de pantalla.
- Clic en los tres enlaces del Hero, las ocho anclas, menú móvil, Escape y foco, tema claro/oscuro y persistencia al recargar, animaciones y Volver arriba: correctos.
- Consola remota: 0 errores y 0 advertencias. Las pruebas táctiles se realizaron previamente en emulación local; no se presenta la prueba remota de clic como una prueba en hardware físico.
- Verificación completada sin cambios en código funcional, Supabase, RLS ni producción. Se actualiza únicamente la documentación de resultados.

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
