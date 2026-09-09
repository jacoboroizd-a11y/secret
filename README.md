# Managua de Noche V10 — Full Community Prototype

V10 es una arquitectura multipágina completa preparada para GitHub Pages.

## Funcionalidad

- Home con feed, comunidades, lugares y guías
- Explorador global
- búsqueda modal global
- filtros
- comunidades + join/leave
- posts + votos + guardados + comentarios
- creación de posts
- lugares + seguimiento
- fichas de lugares con datos públicos + señales comunitarias
- sugerencias de lugares
- eventos + guardar + envío
- guías editoriales con fuentes
- perfiles
- notificaciones
- configuración
- exportación de datos locales
- modo oscuro
- reportes
- consola de moderación demo
- registro/login demo
- diseño responsive
- GitHub Pages compatible

## Backend

No hay backend real todavía. La persistencia usa `localStorage`.

## Fuentes de seed content

Se consultaron:
- Reddit / r/Nicaragua
- Tripadvisor Managua Nightlife
- fichas públicas de negocios
- OpenTable
- prensa local / información pública sobre Puerto Salvador Allende

Los textos están parafraseados; no se reproducen reseñas completas.

## Cómo subir

Subí EL CONTENIDO de esta carpeta a la raíz del repositorio.

Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

## Archivos (28)

- `404.html`
- `about.html`
- `assets/css/styles.css`
- `assets/img/favicon.svg`
- `assets/js/common.js`
- `assets/js/data.js`
- `auth/login.html`
- `auth/register.html`
- `communities/community.html`
- `communities/index.html`
- `discover/index.html`
- `events/index.html`
- `events/new.html`
- `guides/guide.html`
- `guides/index.html`
- `index.html`
- `legal/privacy.html`
- `legal/terms.html`
- `moderation/index.html`
- `notifications/index.html`
- `places/index.html`
- `places/place.html`
- `places/suggest.html`
- `posts/new.html`
- `posts/post.html`
- `profile/index.html`
- `saved/index.html`
- `settings/index.html`