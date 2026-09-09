# Managua de Noche V9.2 — GitHub Pages Ready

Esta versión está preparada para publicarse en un repositorio de GitHub Pages como:

`https://usuario.github.io/managua-de-noche/`

## Diferencia respecto a V9.1

- Se eliminaron las rutas absolutas tipo `/assets/...`
- Las páginas internas usan rutas relativas como `../assets/...`
- El JS genera enlaces compatibles con páginas dentro de subcarpetas
- `index.html` puede vivir en la raíz del repo
- No requiere dominio propio ni configuración de base path

## Cómo subirla

Subí **el contenido de esta carpeta** a la raíz del repositorio:

```text
repo/
├── index.html
├── about.html
├── 404.html
├── assets/
├── auth/
├── communities/
├── places/
├── posts/
├── profile/
├── saved/
└── legal/
```

Luego:

1. GitHub → Settings
2. Pages
3. Deploy from a branch
4. Branch: `main`
5. Folder: `/ (root)`
6. Save

## Nota

Esta sigue siendo Community Alpha sin backend real. Cuenta, guardados y preferencias usan `localStorage`.
