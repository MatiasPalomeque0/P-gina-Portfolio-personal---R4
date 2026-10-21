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

La publicación en Vercel queda pendiente de conectar un repositorio GitHub real y comprobar el deployment público.

Repositorio Git: pendiente de crear y conectar.

Portfolio publicado: pendiente de una nueva configuración de despliegue con las variables de entorno de Supabase.

## Autor

Pendiente de completar con los datos autorizados del propietario.
