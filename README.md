# Managua de Noche — Awareness V3

Sitio editorial ficticio para una simulación interna autorizada de phishing awareness.

## Filosofía

El sitio se comporta como una web editorial normal.
Las acciones públicas funcionan como navegación normal.
Las acciones que normalmente requerirían una cuenta derivan al flujo de awareness.

## Acciones protegidas

- Unirse a la comunidad
- Guardar una guía
- Guardar una colección
- Crear perfil
- Seguir en Facebook / Instagram
- Newsletter
- Acceso con Google / Microsoft / Facebook
- Continuar con correo

## Límite de seguridad

La simulación termina antes de cualquier contraseña.

NO se solicita ni almacena:
- contraseña
- MFA
- passkey
- cookie
- token
- sesión
- credencial de autenticación

## Google Sheets

Publica `google-apps-script.gs` como Web App y pega la URL `/exec` en:

`const ENDPOINT = "";`

dentro de `script.js`.

## GitHub Pages

Sube todos los archivos a la raíz de tu repo y activa Pages sobre `main / root`.
