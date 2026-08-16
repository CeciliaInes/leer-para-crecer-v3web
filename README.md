# Leer para crecer — React + TypeScript + Sanity

Sitio institucional de **Leer para crecer**, preparado para Vercel y con Sanity como CMS para Historias/Blog y una futura galería administrable.

## Stack

- React 19 + TypeScript
- Vite 8
- React Compiler
- React Router
- Sanity Studio 6
- `@sanity/client` + GROQ
- Portable Text

## 1. Instalar

Requisito recomendado para Sanity Studio: Node.js 22.12+.

```bash
npm install
```

## 2. Crear/conectar tu proyecto Sanity

Desde la raíz del proyecto puedes crear un proyecto nuevo con la CLI oficial:

```bash
npx sanity@latest init --yes --project-name "Leer para crecer" --dataset-default --template clean --typescript --output-path studio
```

Si ya tienes un proyecto Sanity, usa su **Project ID** y conserva `production` como dataset (o cambia el dataset si ya tienes otro).

Copia:

- `.env.example` → `.env.local`
- `studio/.env.example` → `studio/.env`

Frontend:

```env
VITE_SANITY_PROJECT_ID=tu_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-08-15
```

Studio:

```env
SANITY_STUDIO_PROJECT_ID=tu_project_id
SANITY_STUDIO_DATASET=production
```

## 3. Ejecutar la web

```bash
npm run dev
```

La web funciona incluso sin Sanity gracias a contenido local de demostración. Cuando coloques el Project ID, la sección **Historias** empieza a consultar Sanity automáticamente.

## 4. Ejecutar el CMS

En otra terminal:

```bash
npm run dev:studio
```

El Studio permite crear historias desde el navegador, subir una portada desde el celular y publicar sin modificar GitHub.

## 5. Desplegar Sanity Studio

Dentro del Studio:

```bash
cd studio
npx sanity deploy
```

Sanity te pedirá un hostname. El Studio quedará en una URL tipo `tu-proyecto.sanity.studio`.

## 6. Conectar Vercel

Sube este proyecto a GitHub y conecta el repositorio con Vercel. En Vercel añade:

```env
VITE_SANITY_PROJECT_ID=tu_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-08-15
```

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

## 7. CORS en Sanity

En Sanity Manage agrega el dominio de Vercel en **Settings → API → CORS Origins**. Para desarrollo añade también `http://localhost:5173`.

## Donaciones

La sección de Colabora ya está preparada con dos caminos:

1. Donación de libros.
2. Donación de dinero.

Los botones actualmente son puntos de integración para añadir los datos reales de la fundación (Yape/Plin, transferencia, formulario, dirección y horarios de recepción de libros). No inventé datos bancarios ni números de contacto.

## Fotos

Las 68 fotografías entregadas fueron optimizadas a WebP y distribuidas en el banner, Inicio y Galería. El logo entregado se conserva como `public/logo.png`.
