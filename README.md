# Portfolio personal R4

Portfolio personal de una sola página desarrollado para el Trabajo Práctico R4.

## Estado

La aplicación está implementada con componentes React, navegación interna, hooks, eventos, animaciones de entrada y diseño responsive. El contenido cargado se basa en los proyectos R1, R2 y R3 existentes en el workspace y en los datos personales que figuran en el material previo del portfolio.

## Tecnologías

- React
- TypeScript
- Vite
- CSS propio
- Git
- ESLint
- Supabase (`@supabase/supabase-js`)
- Vercel como destino de publicación

## Secciones

- Inicio
- Sobre mí
- Habilidades
- Proyectos
- Experiencia
- Logros
- Educación
- Contacto

## Proyectos incluidos

- R1 — React + Vite.
- R2 — Manejo de Rutas.
- R3 — Sistema de Usuarios.

Las capturas, URLs específicas de GitHub y demos de cada proyecto se agregarán cuando estén disponibles y autorizadas.

## Contacto

- GitHub: https://github.com/MatiasPalomeque0
- Email: matiaspalomeque2008@gmail.com
- LinkedIn: no se publica.

## Hooks y eventos

- `useState`: apertura y cierre del menú móvil.
- `useEffect`: configuración y limpieza de `IntersectionObserver`.
- `useRef`: referencias de elementos observados.
- `useActiveSection`: actualización de la sección visible del navbar.
- `onClick`: navegación interna, menú responsive y enlaces.
- `IntersectionObserver`: activación de animaciones al entrar en viewport.

## Responsive y controles flotantes

Los tres enlaces del Inicio mantienen anclas nativas: Proyectos, Sobre mí y Contacto. El círculo decorativo `Hero::before` tiene `pointer-events: none`: antes interceptaba los clics y toques sobre estos enlaces. `scroll-margin-top` reserva espacio para el Navbar. Al abrir o recargar una URL con ancla, React restaura el destino después de la primera carga de datos para evitar posiciones incorrectas por el montaje y los cambios de altura.

Contacto utiliza columnas `minmax(0, 1fr)`, hijos con `min-width: 0` y `overflow-wrap: anywhere` para el correo. En móvil la etiqueta aparece encima del valor, que conserva 16 px de fuente. Se retiró `overflow-x: hidden` del body y el ancho mínimo que provocaba desborde en 320 px. El menú móvil se activa hasta 980 px para que los enlaces del Navbar no desborden en tablet; cerrado no recibe foco, y Escape lo cierra y devuelve el foco al botón.

`FloatingControls.tsx` agrupa dos controles de 48 × 48 px, separados verticalmente, en la esquina inferior derecha y con márgenes que respetan las áreas seguras del dispositivo:

- Tema: el script inicial de `index.html` elige `light`/`dark` antes de pintar. Lee `portfolio-theme` de `localStorage` o utiliza `prefers-color-scheme`; el componente conserva la elección manual y sigue cambios del sistema si no existe una elección. Si el almacenamiento está bloqueado, el cambio sigue funcionando durante la sesión.
- Volver al inicio: aparece al superar 400 px de scroll, usa desplazamiento suave o inmediato con `prefers-reduced-motion`, y desaparece al volver arriba. Su listener pasivo se elimina al desmontar el componente.

Los iconos son SVG decorativos; los botones tienen nombres accesibles y funcionamiento nativo de teclado y toque. Se conserva el menú ☰ del Navbar y el enlace del footer. No había otro botón circular flotante en el código del portfolio; los controles externos de Vercel o del navegador no se modifican.

### Pruebas responsive (2026-10-21)

Pruebas reales con Playwright sobre Microsoft Edge/Chromium, usando Supabase real en localhost. El ejecutor y las capturas quedaron fuera del repositorio en una carpeta temporal; no se agregaron dependencias de pruebas al proyecto.

| Ancho | Interacción | Hero y 8 anclas | Correo completo | Desborde horizontal | Tema, recarga y Volver arriba |
| --- | --- | --- | --- | --- | --- |
| 320 px | Toque emulado + teclado | OK | OK, 2 líneas | No | OK |
| 360 px | Toque emulado + teclado | OK | OK | No | OK |
| 375 px | Toque emulado + teclado | OK | OK | No | OK |
| 390 px | Toque emulado + teclado | OK | OK | No | OK |
| 768 px | Toque emulado + teclado | OK | OK, 2 líneas | No | OK |
| 1024 px | Mouse + teclado | OK | OK | No | OK |
| 1920 px | Mouse + teclado | OK | OK | No | OK |

Además se verificaron las animaciones de entrada, el cierre del menú al navegar y con Escape, el foco, los controles de 48 px, el tema inicial del sistema claro/oscuro, la persistencia y los tres primeros fotogramas al recargar, `prefers-reduced-motion` y la alternativa con `localStorage` bloqueado. Sin errores de consola en los siete anchos. Los enlaces de contacto conservaron `mailto:` y la URL real de GitHub; la prueba no envía correos.

En cada ancho se comprobaron 3 proyectos con 5 tecnologías cada uno, 18 habilidades, 3 experiencias y 3 logros. No se modificaron el cliente ni los servicios Supabase, las tablas, las migraciones ni RLS. TypeScript, ESLint y build finalizaron sin errores; ambas auditorías npm reportaron 0 vulnerabilidades. Las pruebas de toque son emulación de navegador: la revisión en hardware iOS/Android físico queda pendiente.

El build servido con `vite preview` también pasó una prueba en 320 px: ancla inicial de Contacto, correo, ambos temas y apertura real de GitHub en una pestaña nueva. Se observaron exactamente cuatro peticiones GET a la Data API (`proyectos`, `habilidades`, `experiencias`, `logros`); las tecnologías llegan anidadas en la consulta de proyectos. Se comprobó que un cambio de tema del sistema se refleja automáticamente y que una elección manual tiene prioridad.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Para comprobar calidad y tipos:

```bash
npm run lint
npx tsc -b --pretty false
```

## Build de producción

```bash
npm run build
npm run preview
```

La auditoría de dependencias se puede ejecutar con:

```bash
npm audit
npm audit --omit=dev
```

La revisión técnica de la integración se encuentra en [`docs/INTEGRACION_SUPABASE.md`](docs/INTEGRACION_SUPABASE.md).

## Integración con Supabase

Los contenidos dinámicos se consultan desde las tablas públicas de Supabase mediante `@supabase/supabase-js` y la clave publishable del proyecto:

- `proyectos` y sus relaciones con `tecnologias` mediante `proyecto_tecnologia`.
- `habilidades` publicadas.
- `experiencias` publicadas.
- `logros` publicados.

El perfil personal, la educación, la información de contacto y la presentación permanecen estáticos porque no forman parte de estas tablas. La lista de tecnologías favoritas también permanece estática hasta que el esquema incorpore una marca específica para ese dato.

La aplicación solo ejecuta consultas `SELECT` filtradas por `publicado = true`. RLS continúa siendo responsabilidad de Supabase; no se modifican tablas ni políticas desde React.

### Configuración local

Crear `.env.local` en la raíz del proyecto, sin subirlo a Git:

```env
VITE_SUPABASE_URL=URL_DEL_PROYECTO
VITE_SUPABASE_PUBLISHABLE_KEY=CLAVE_PUBLISHABLE
```

Los valores se obtienen desde **Supabase → Project Settings → API**. No usar `service_role` ni claves secretas en el navegador. `.env.local` está excluido por `.gitignore`; `.env.example` sirve como plantilla sin credenciales.

Si una consulta falla, las secciones dinámicas muestran un estado de error y un botón de reintento; no utilizan automáticamente los datos estáticos como reemplazo.

## Deployment

Repositorio: [MatiasPalomeque0/P-gina-Portfolio-personal---R4](https://github.com/MatiasPalomeque0/P-gina-Portfolio-personal---R4).

La versión verificada de `preview/portfolio-supabase` (`09ef942`) se integró por fast-forward en `main` el 2026-10-21, con autorización expresa del propietario para publicar en producción. Se conserva la rama Preview. Vercel utiliza la integración Git existente: los pushes a `main` actualizan Production y los de la rama de trabajo generan Preview. Las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` se configuran en Vercel para cada entorno; sus valores no se documentan ni se suben al repositorio.

- Preview de la rama: [portfolioo-git-preview-portfolio-supabase-pdisc.vercel.app](https://portfolioo-git-preview-portfolio-supabase-pdisc.vercel.app/).
- Producción: [portfolioo-eta-five.vercel.app](https://portfolioo-eta-five.vercel.app/), asociada a `main` en el proyecto existente `portfolioo`.
- Respaldo local anterior a estas correcciones: `backup/pre-responsive-2026-10-21` (`e912ed5`).
- Respaldo de producción anterior a la integración: etiqueta `backup/production-eff6891-2026-10-21`, que conserva `eff68915653b5ea215428f0b48c1794ff3a8c867`.

Antes del push se ejecutan instalación limpia, TypeScript, ESLint, build y ambas auditorías npm. La publicación se verifica contra el SHA completo de `main`, el entorno **Production – portfolioo** registrado por Vercel en GitHub y el dominio original. Las pruebas de Preview no sustituyen las pruebas sobre el dominio de producción. No se cambian las variables de Vercel, SQL, datos ni RLS durante esta operación.

La validación remota de la Preview se completó el 2026-10-21 después de iniciar sesión en Vercel. Se verificaron 3 proyectos (5 tecnologías cada uno), 18 habilidades, 3 experiencias y 3 logros. En 320, 360, 375, 390, 768, 1024 y 1920 px no hubo desborde horizontal, tarjetas fuera de pantalla ni correo recortado. Los tres enlaces del Hero, las ocho anclas del menú, cierre con Escape y retorno del foco, cambio de tema, persistencia al recargar, animaciones y Volver arriba funcionaron en el despliegue. La consola remota terminó sin errores ni advertencias. La prueba remota se realizó con clic y teclado; las pruebas táctiles previas utilizaron emulación Chromium local. La revisión en dispositivos físicos permanece pendiente.

## Autor

Pendiente de completar con los datos autorizados del propietario.
