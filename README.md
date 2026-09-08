# Managua de Noche — V4

Versión más madura del sitio para una simulación interna autorizada de awareness.

## Qué cambia en V4

- Fotografía real de Managua y vida nocturna
- Créditos visibles
- Home con estructura editorial, no de landing genérica
- Agenda semanal
- Newsletter
- Artículos navegables
- Footer y navegación más completos
- Microcopy menos artificial
- Estados y detalles de un producto más maduro
- Acciones protegidas consistentes
- Flujo de acceso sin contraseña

## Fotografías

1. Centro de Managua
   - Autor: Vrysxy
   - Fuente: Wikimedia Commons
   - Licencia: CC0
   - https://commons.wikimedia.org/wiki/File:Manaagua_Downtown.jpg

2. Banda en vivo, Managua
   - Autor: Les Taylor
   - Fuente: Unsplash
   - Licencia: Unsplash License
   - https://unsplash.com/photos/band-performing-live-music-on-stage-WAbIBf2umoE

3. DJ / vinilos, Managua
   - Autor: Les Taylor
   - Fuente: Unsplash
   - Licencia: Unsplash License
   - https://unsplash.com/photos/dj-with-headphones-surrounded-by-records-and-playing-vinyl-records-sS0urUETvn0

Las imágenes se cargan remotamente. Para producción conviene descargar y servir copias conforme a la licencia aplicable.

## Límite de seguridad

El sitio nunca solicita:
- contraseñas
- códigos MFA
- passkeys
- cookies de sesión
- tokens
- credenciales de autenticación

Las acciones de proveedor (“Continuar con Google”, Microsoft, Facebook) registran únicamente el intento de continuar y finalizan inmediatamente en la pantalla de awareness.

## Google Sheets

Publica `google-apps-script.gs` como Web App y pega la URL `/exec` en:

`const ENDPOINT = "";`

dentro de `script.js`.
