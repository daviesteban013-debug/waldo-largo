# Waldo Largo — Frontend

Frontend editorial para la marca personal de **Waldo Largo**, construido con Vite + React + TypeScript + Tailwind CSS v4.

## Requisitos

- Node.js ≥ 18
- El backend corriendo en paralelo (ver `../backend/`)

## Setup

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
# Editar .env si el backend corre en un puerto distinto

# Iniciar dev server
npm run dev
```

El frontend correrá en **http://localhost:5173** por defecto.

## Correr junto al backend

1. **Terminal 1** — Backend:
   ```bash
   cd ../backend
   npm run dev
   # → http://localhost:4000
   ```

2. **Terminal 2** — Frontend:
   ```bash
   cd ../frontend
   npm run dev
   # → http://localhost:5173
   ```

Asegúrate de que `FRONTEND_URL=http://localhost:5173` en el `.env` del backend
para que CORS y la protección CSRF permitan las peticiones del frontend.

## Estructura

```
src/
├── api/          # Cliente API centralizado y tipos
│   ├── client.ts
│   └── types.ts
├── components/   # Componentes reutilizables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── ArticleCard.tsx
│   ├── ContactForm.tsx
│   └── NewsletterForm.tsx
├── pages/        # Páginas (rutas)
│   ├── Home.tsx
│   ├── Blog.tsx
│   ├── Post.tsx
│   ├── About.tsx
│   └── Contact.tsx
└── styles/
    └── index.css  # Tailwind + design tokens + componentes CSS
```

## Stack

- **Vite** — bundler
- **React 19** + TypeScript
- **Tailwind CSS v4** — utilidades y design tokens
- **React Router** — enrutamiento SPA
- **react-hook-form** + **zod** — validación de formularios
- **fetch nativo** — llamadas API (sin Axios)
