# Waldo Largo — Sitio de Marca Personal

Plataforma web de marca personal para un escritor/creador de contenido. Incluye un sitio público con blog, página de contacto y un panel de administración (CMS) para gestionar posts y mensajes.

## Stack

### Backend
- **Runtime:** Node.js ≥ 20
- **Framework:** Express 5
- **ORM:** Prisma (PostgreSQL)
- **Auth:** express-session + bcrypt
- **Email:** Resend
- **Validación:** Zod
- **Seguridad:** Helmet, HPP, express-rate-limit, CORS, sanitize-html

### Frontend
- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Routing:** React Router 7
- **Estilos:** Tailwind CSS 4
- **Formularios:** React Hook Form + Zod
- **Linting:** oxlint

## Requisitos Previos

- Node.js ≥ 20
- PostgreSQL (local o servicio como Neon/Railway)
- Cuenta en [Resend](https://resend.com) para envío de emails

## Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/<tu-usuario>/waldo-largo.git
cd waldo-largo
```

### 2. Configurar el Backend

```bash
cd backend
npm install

# Copiar el archivo de variables de entorno
cp .env.example .env
# Editar .env con tus credenciales reales (DB, Resend API key, etc.)

# Generar el cliente Prisma y correr migraciones
npx prisma generate
npx prisma migrate dev

# (Opcional) Sembrar datos iniciales (crea usuario admin)
npm run db:seed

# Levantar el servidor de desarrollo
npm run dev
```

El backend correrá en `http://localhost:4000` por defecto.

### 3. Configurar el Frontend

```bash
cd frontend
npm install

# Copiar el archivo de variables de entorno
cp .env.example .env
# Verificar que VITE_API_URL apunte a tu backend

# Levantar el servidor de desarrollo
npm run dev
```

El frontend correrá en `http://localhost:5173` por defecto.

## Variables de Entorno

### Backend (`.env`)

| Variable                     | Descripción                                |
|------------------------------|--------------------------------------------|
| `NODE_ENV`                   | Entorno (`development` / `production`)     |
| `PORT`                       | Puerto del servidor (default: `4000`)      |
| `FRONTEND_URL`               | URL del frontend (CORS)                    |
| `DATABASE_URL`               | Connection string de PostgreSQL            |
| `SESSION_SECRET`             | Secret para sesiones (mín. 32 caracteres)  |
| `ADMIN_EMAIL`                | Email del admin para seed inicial          |
| `ADMIN_PASSWORD`             | Password del admin para seed inicial       |
| `RESEND_API_KEY`             | API key de Resend                          |
| `EMAIL_FROM`                 | Email remitente                            |
| `ADMIN_NOTIFICATION_EMAIL`   | Email donde llegan notificaciones de contacto |
| `TRUST_PROXY`                | `true` si está detrás de proxy (Railway, Render) |

### Frontend (`.env`)

| Variable       | Descripción                        |
|----------------|------------------------------------|
| `VITE_API_URL` | URL base del backend API           |

> ⚠️ **Nunca subas archivos `.env` con secrets reales al repositorio.** Usa `.env.example` como referencia.

## Estructura del Proyecto

```
waldo-largo/
├── backend/
│   ├── prisma/          # Schema y migraciones
│   ├── src/             # Código fuente del servidor
│   ├── .env.example     # Plantilla de variables de entorno
│   ├── Dockerfile       # Para deploy en contenedor
│   └── package.json
├── frontend/
│   ├── public/          # Assets estáticos
│   ├── src/             # Código fuente React
│   ├── .env.example     # Plantilla de variables de entorno
│   └── package.json
└── README.md
```

## Scripts Útiles

### Backend
| Comando                | Acción                                    |
|------------------------|-------------------------------------------|
| `npm run dev`          | Servidor de desarrollo con hot-reload     |
| `npm run build`        | Compilar TypeScript                       |
| `npm start`            | Iniciar servidor compilado                |
| `npm run db:migrate`   | Correr migraciones de Prisma              |
| `npm run db:seed`      | Sembrar datos iniciales                   |
| `npm run db:studio`    | Abrir Prisma Studio (GUI de la DB)        |

### Frontend
| Comando                | Acción                                    |
|------------------------|-------------------------------------------|
| `npm run dev`          | Servidor de desarrollo Vite               |
| `npm run build`        | Build de producción                       |
| `npm run preview`      | Preview del build de producción           |
| `npm run lint`         | Ejecutar linter (oxlint)                  |

## Licencia

Proyecto privado. Todos los derechos reservados.
