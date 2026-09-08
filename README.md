# Phishing Awareness Test — Static Demo

Proyecto estático para una simulación autorizada de concientización.

## Flujo

1. Encuesta
2. Submit
3. Selección de escenario
4. Uno de estos tres:
   - Inicio de sesión manual
   - Sign in with Google
   - Sign in with Microsoft
5. FAILED PHISHING TEST

## Límite de seguridad

El proyecto NO implementa autenticación real y NO solicita:

- contraseñas
- códigos MFA
- passkeys
- cookies
- tokens
- credenciales reales

En el escenario manual, la prueba termina inmediatamente después de introducir el correo y pulsar Next.

## Archivos

- `index.html` — encuesta
- `scenario.html` — selector de escenario
- `login-manual.html` — email → Next → failed
- `login-google.html` — botón simulado → failed
- `login-microsoft.html` — botón simulado → failed
- `failed.html` — pantalla final
- `styles.css` — estilos
- `script.js` — telemetría
- `google-apps-script.gs` — receptor opcional para Google Sheets

## Google Sheets

1. Crea un Google Sheet.
2. Ve a Extensions > Apps Script.
3. Pega `google-apps-script.gs`.
4. Haz Deploy > New deployment > Web app.
5. Copia la URL que termina en `/exec`.
6. Abre `script.js`.
7. Pega la URL en:

   `const ENDPOINT = "";`

La hoja guardará:

- timestamp
- campaign
- event
- email
- scenario

## GitHub Pages

Sube estos archivos a un repositorio y habilita GitHub Pages.

No hay backend de autenticación: todas las páginas son estáticas.
