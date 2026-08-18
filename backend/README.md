# Writer CMS Backend

Backend API para sitio web de marca personal (estilo revista editorial). CMS de posts, formulario de contacto y newsletter con double opt-in.

## Stack

- Node.js 20+ / Express 5 / TypeScript
- PostgreSQL + Prisma ORM
- Auth: sesiones con cookie httpOnly (connect-pg-simple)
- Email: Resend
- Seguridad: Helmet, CORS, CSRF protection, rate limiting, Zod, sanitización

## Requisitos

- Node.js >= 20
- PostgreSQL 15+
- Cuenta en [Resend](https://resend.com) con dominio verificado (producción)

## Setup local

```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tus valores (DATABASE_URL, SESSION_SECRET, etc.)
```

Crea la base de datos PostgreSQL y configura `DATABASE_URL` en `.env`.

```bash
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

El servidor arranca en `http://localhost:4000`.

## Variables de entorno

Copia `.env.example` a `.env`. Variables requeridas:

| Variable | Descripción |
|---|---|
| `NODE_ENV` | `development` \| `production` |
| `PORT` | Puerto del servidor (default: 4000) |
| `FRONTEND_URL` | URL del frontend para CORS y CSRF (ej. `http://localhost:5173`) |
| `DATABASE_URL` | Connection string PostgreSQL |
| `SESSION_SECRET` | Secreto para firmar sesiones (min 32 chars) |
| `RESEND_API_KEY` | API key de Resend |
| `EMAIL_FROM` | Email remitente verificado en Resend |
| `ADMIN_NOTIFICATION_EMAIL` | Email donde llegan mensajes de contacto |
| `ADMIN_EMAIL` | Email del admin (solo seed) |
| `ADMIN_PASSWORD` | Password del admin (solo seed) |
| `TRUST_PROXY` | `true` en Railway/Render |

## API Endpoints

### Públicos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Health check (incluye DB) |
| GET | `/posts` | Lista posts publicados (paginado) |
| GET | `/posts/:slug` | Post publicado por slug |
| POST | `/contact` | Formulario de contacto |
| POST | `/newsletter/subscribe` | Suscripción newsletter (double opt-in) |
| GET | `/newsletter/confirm?token=` | Confirmar suscripción |
| POST | `/newsletter/unsubscribe` | Cancelar suscripción |

### Admin (requiere sesión)

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Usuario actual |
| GET | `/admin/posts` | Todos los posts (paginado) |
| GET | `/admin/posts/:id` | Detalle post |
| POST | `/admin/posts` | Crear post |
| PATCH | `/admin/posts/:id` | Editar post |
| PATCH | `/admin/posts/:id/publish` | Publicar post |
| DELETE | `/admin/posts/:id` | Eliminar post |
| GET | `/admin/contact` | Mensajes de contacto (paginado) |
| GET | `/admin/newsletter` | Suscriptores newsletter (paginado, filtrable por estado) |

### Paginación

Todos los endpoints con listas soportan query params `?page=1&limit=10`. El endpoint de newsletter admin también acepta `?status=CONFIRMED|PENDING|UNSUBSCRIBED`.

Respuesta paginada:

```json
{
  "posts": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5
  }
}
```

## Autenticación (SPA cross-origin)

El frontend debe enviar requests con `credentials: 'include'`:

```javascript
fetch('https://tu-backend.railway.app/auth/login', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
```

La cookie de sesión (`sid`) se setea automáticamente como `httpOnly`, `secure` (en prod), y `sameSite: "none"` (para cross-origin).

## Seguridad

| Capa | Implementación |
|---|---|
| Headers HTTP | Helmet.js (CSP, HSTS, X-Frame-Options, etc.) |
| CORS | Solo `FRONTEND_URL`, `credentials: true` |
| CSRF | Validación de `Origin` header en requests mutantes |
| Rate limiting | Global (100/15m), login (10), contact (5), newsletter (5) |
| Input validation | Zod schemas en todos los endpoints |
| XSS prevention | `sanitize-html`, filtrado de tags peligrosos, URL protocol check |
| SQL injection | Prisma ORM (parametrized queries), no queries raw |
| Sessions | `httpOnly`, `secure`, `sameSite: "none"`, pg-backed store |
| Passwords | bcrypt con 12 rounds |
| Tokens | SHA-256 hash de tokens de confirmación, expiración 24h |
| HTTPS | Enforced en producción (403 si no es HTTPS) |
| Body limit | 1MB max payload |
| HPP | `hpp` middleware contra HTTP Parameter Pollution |

## Deploy en Railway (recomendado)

### Opción A: Deploy directo (Nixpacks, más simple)

1. Crea proyecto en [Railway](https://railway.app)
2. Añade servicio PostgreSQL
3. Conecta tu repo GitHub
4. Root directory: `backend`
5. Variables de entorno (copia de `.env.example` con valores de prod):
   - `DATABASE_URL` → referencia al Postgres de Railway
   - `FRONTEND_URL` → URL de tu frontend en Vercel/Netlify
   - `SESSION_SECRET` → string aleatorio de 32+ chars
   - `TRUST_PROXY=true`
   - `NODE_ENV=production`
   - Credenciales Resend
6. Build command: `npm run build`
7. Start command: `npx prisma migrate deploy && npm start`

### Opción B: Docker

1. Mismos pasos pero Railway detecta el `Dockerfile` automáticamente
2. No necesitas especificar build/start commands

### Estimación de costo

- **Railway Hobby plan**: $5/mes (incluye $5 de uso). Para bajo tráfico, un backend + Postgres suele costar ~$3-5/mes.
- Sleep mode disponible para ahorrar cuando no hay tráfico.

## Checklist de seguridad (producción)

- [ ] `SESSION_SECRET` único y largo (32+ chars)
- [ ] `FRONTEND_URL` apunta solo a tu dominio de producción
- [ ] Dominio verificado en Resend para `EMAIL_FROM`
- [ ] `TRUST_PROXY=true` en Railway
- [ ] HTTPS activo (Railway lo provee)
- [ ] Password de admin fuerte
- [ ] No commitear `.env`
- [ ] Verificar que CORS solo acepta tu dominio

## Pruebas

Usa los ejemplos en [`docs/api-examples.http`](docs/api-examples.http) con la extensión REST Client (VS Code) o Thunder Client.

```bash
# Health check
curl http://localhost:4000/health

# Login (guarda cookie)
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-password"}' \
  -c cookies.txt

# List published posts
curl http://localhost:4000/posts

# Create post (requiere cookie de sesión)
curl -X POST http://localhost:4000/admin/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Mi artículo","content":"# Hola\n\nContenido aquí."}'

# List contact messages (admin)
curl http://localhost:4000/admin/contact -b cookies.txt

# List newsletter subscribers (admin, solo confirmados)
curl "http://localhost:4000/admin/newsletter?status=CONFIRMED" -b cookies.txt

# Contact form
curl -X POST http://localhost:4000/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@test.com","message":"Hola, quiero colaborar."}'

# Newsletter subscribe
curl -X POST http://localhost:4000/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"lector@test.com"}'
```

## Estructura del proyecto

```
backend/
├── prisma/
│   ├── schema.prisma    # Modelos: User, Post, ContactMessage, NewsletterSubscriber
│   └── seed.ts          # Seed del admin
├── src/
│   ├── config/
│   │   └── env.ts       # Validación de env con Zod
│   ├── controllers/     # Capa HTTP (req/res)
│   │   ├── auth.controller.ts
│   │   ├── post.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── newsletter.controller.ts
│   │   ├── admin-contact.controller.ts
│   │   ├── admin-newsletter.controller.ts
│   │   └── health.controller.ts
│   ├── services/        # Lógica de negocio
│   │   ├── auth.service.ts
│   │   ├── post.service.ts
│   │   ├── contact.service.ts
│   │   └── newsletter.service.ts
│   ├── routes/          # Definición de rutas
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── posts.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── newsletter.routes.ts
│   │   ├── admin-contact.routes.ts
│   │   └── admin-newsletter.routes.ts
│   ├── middlewares/     # Auth, CORS, CSRF, rate limit, etc.
│   │   ├── auth.middleware.ts
│   │   ├── cors.middleware.ts
│   │   ├── csrf.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   ├── session.middleware.ts
│   │   └── validate.middleware.ts
│   ├── schemas/         # Validación Zod
│   │   ├── auth.schema.ts
│   │   ├── post.schema.ts
│   │   ├── contact.schema.ts
│   │   ├── newsletter.schema.ts
│   │   └── admin.schema.ts
│   ├── lib/             # Clientes (Prisma, Resend)
│   ├── utils/           # Sanitize, tokens, slugify, errors
│   ├── types/           # TypeScript declarations
│   ├── app.ts           # Express app config
│   └── server.ts        # Entry point + graceful shutdown
├── docs/
│   └── api-examples.http
├── Dockerfile
├── .dockerignore
├── .env.example
└── .gitignore
```
